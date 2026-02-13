import { EventEmitter } from "events";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import Experience from "../Experience"
import Renderer from "../Renderer";
import * as THREE from "three"

// Load Resources from Assets.ts
export default class Resources extends EventEmitter {
    experience: Experience;
    renderer: Renderer;
    assets: Array<any>
    items: Object;
    queue: number;
    loaded: number;
    loaders: Object;
    video: Object;
    videoTexture: Object;

    constructor(assets?: Array<any>) {
        super()
        this.experience = new Experience();
        this.renderer = new Renderer();
        this.assets = assets;

        this.items = {};
        this.queue = this.assets.length
        this.loaded = 0;
        this.setLoaders();
        this.startLoading();
    }

    //Set up draco/gltf loader from Three Js
    setLoaders() {
        this.loaders = { gltfLoader: new GLTFLoader(), dracoLoader: new DRACOLoader() };
        // Use Google's CDN for better caching and potentially faster loading
        this.loaders['dracoLoader'].setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
        this.loaders['gltfLoader'].setDRACOLoader(this.loaders['dracoLoader'])

    }

    //Match glbModel items from Assets.ts to gltf Loader
    startLoading() {
        console.time("Total asset loading");
        for (const asset of this.assets) {
            if (asset.type === "glbModel") {
                console.time(`Loading ${asset.name}`);
                this.loaders['gltfLoader'].load(
                    asset.path,
                    (file) => {
                        console.timeEnd(`Loading ${asset.name}`);
                        this.singleAssetLoaded(asset, file);
                    },
                    (xhr) => {
                        // Track loading progress
                        if (xhr.total > 0) {
                            const progress = (xhr.loaded / xhr.total) * 100;
                            this.emit("progress", { asset: asset.name, progress });
                        }
                    },
                    (error) => {
                        console.error(`Error loading ${asset.name}:`, error);
                    }
                );
            } else if (asset.type === "videoTexture") {
                this.video = {};
                this.videoTexture = {};

                this.video[asset.name] = document.createElement("video");
                this.video[asset.name].src = asset.path;
                this.video[asset.name].muted = true;
                this.video[asset.name].playsInline = true;
                this.video[asset.name].autoplay = true;
                this.video[asset.name].loop = true;
                // Preload only metadata to reduce initial loading time
                this.video[asset.name].preload = "metadata";

                // Add error handling for video loading
                this.video[asset.name].addEventListener("error", (e) => {
                    console.error(`Error loading video ${asset.name}:`, e);
                });

                this.video[asset.name].play();

                this.videoTexture[asset.name] = new THREE.VideoTexture(
                    this.video[asset.name]
                );
                this.videoTexture[asset.name].flipY = false;
                this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].magFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].generateMipmaps = false;

                this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
            }
        }
    }
    singleAssetLoaded(asset: any, file: any) {
        this.items[asset.name] = file;
        this.loaded++;
        if (this.loaded === this.queue) {
            console.timeEnd("Total asset loading");
            console.log("ready")
            this.emit("ready")
        }
    }
}