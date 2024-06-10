import {EventEmitter} from "events";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import Experience from "../Experience"
import Renderer from "../Renderer";
export default class Resources extends EventEmitter{
    experience: Experience;
    renderer: Renderer;
    assets: Array<any>
    items: Object;
    queue: number;
    loaded: number;
    loaders:Object;

    constructor(assets?:Array<any>){
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

    setLoaders(){
        this.loaders = {gltfLoader:new GLTFLoader(),dracoLoader: new DRACOLoader()};
        // this.loaders['gltfLoader'] = new GLTFLoader();
        // this.loaders['dracoLoader'] = new DRACOLoader();
        this.loaders['dracoLoader'].setDecoderPath("/draco/");
        this.loaders['gltfLoader'].setDRACOLoader(this.loaders['dracoLoader'])
        
    }
    startLoading(){
        for(const asset of this.assets){
            if(asset.type === "glbModel"){
                this.loaders['gltfLoader'].load(asset.path, (file)=>{
                    this.singleAssetLoaded(asset,file)
                })
            }
        }
    }
    singleAssetLoaded(asset:any, file:any){
        this.items[asset.name] = file;
        this.loaded++;
        if(this.loaded === this.queue){
            console.log("ready")
            this.emit("ready")
        }
    }
}