import * as THREE from 'three';
import Sizes from "./Utils/Sizes.ts"
import Time from "./Utils/Time.ts"
import Resources from "./Utils/Resource.ts"
import assets from "./Utils/Assets.ts"
import Camera from "./Camera.js"
import Renderer from "./Renderer.ts"
import Preloader from "./Preloader.ts"

import World from "./World/World.ts"
import Controls from './World/Controls.ts';
import Room from './World/Room.ts';
import Theme from './Theme.ts'


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
preloader: Preloader
controls:Controls;
room:Room
theme:Theme



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
        this.theme = new Theme()
        this.world = new World();
       
          this.room = this.world.room
       
      
          this.preloader = new Preloader()
      
        

        this.sizes.on("resize",()=>{
 
            this.resize();
        })
        this.time.on("update",()=>{
            this.update();
        })

        this.preloader.on("enablecontrols", () => {
          // this.room.onMouseMove();
          this.controls = new Controls();
         
      });
        
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