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
        this.loaders['dracoLoader'].setDecoderPath("/draco/");
        this.loaders['gltfLoader'].setDRACOLoader(this.loaders['dracoLoader'])

    }

    //Match glbModel items from Assets.ts to gltf Loader
    startLoading() {
        for (const asset of this.assets) {
            if (asset.type === "glbModel") {
                this.loaders['gltfLoader'].load(asset.path, (file) => {
                    this.singleAssetLoaded(asset, file)
                })
            } else if (asset.type === "videoTexture") {
                this.video = {};
                this.videoTexture = {};

                this.video[asset.name] = document.createElement("video");
                this.video[asset.name].src = asset.path;
                this.video[asset.name].muted = true;
                this.video[asset.name].playsInline = true;
                this.video[asset.name].autoplay = true;
                this.video[asset.name].loop = true;
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
            console.log("ready")
            this.emit("ready")
        }
    }
}