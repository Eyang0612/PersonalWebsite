import * as THREE from 'three';
import Sizes from "./Utils/Sizes.ts"
import Time from "./Utils/Time.ts"
import Resources from "./Utils/Resource.ts"
import assets from "./Utils/Assets.ts"
import Camera from "./Camera.js"
import Renderer from "./Renderer.ts"

import World from "./World/World.ts"


export default class Experience{
    static instance: any;
canvas: any;
sizes: Sizes;
scene: THREE.Scene;
camera: Camera
time: Time;
renderer: Renderer;
resources: Resources;
world: World;



    constructor(canvas?: any) {
        if(Experience.instance){
            return Experience.instance
        }
        Experience.instance = this
        if(canvas){
        this.canvas = canvas
        }
        this.scene = new THREE.Scene()
        this.sizes= new Sizes()
        this.time = new Time()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.resources = new Resources(assets)
        this.world = new World();

        this.sizes.on("resize",()=>{
          console.log('resize')
            this.resize();
        })
        this.time.on("update",()=>{
            this.update();
        })
        
      }

      update(){
        this.camera.update();
        this.renderer.update();
        this.world.update();

      }

      resize(){
        this.camera.resize();
        this.renderer.resize();
       

      }

}