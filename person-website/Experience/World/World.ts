import Experience from "../Experience"
import Sizes from "../Utils/Sizes"
import Camera from "../Camera"
import Room from "./Room"
import Environment from "./Environment"
import Controls from "./Controls"
import Resources from "../Utils/Resource"
import Floor from './Floor'
import * as THREE from 'three';
import { EventEmitter } from "events";

export default class World extends EventEmitter {

    experience: Experience;
    sizes: Sizes;
    scene: THREE.Scene;
    canvas: any;
    camera: Camera;
    renderer: THREE.WebGLRenderer;
    room: Room;
    environment: Environment;
    resources: Resources;
    controls: Controls
    floor:Floor;

    constructor(){
        super()
        this.experience = new Experience();
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.camera= this.experience.camera;
        
        this.resources = this.experience.resources;

        this.resources.on('ready',()=>{
            this.environment = new Environment();
            this.room = new Room()
            this.floor = new Floor()
     
            this.emit("worldready")
        })
        
    
    }

  
    resize() {
        
    }

    update() {
        if(this.controls){
            this.controls.update()
        }
        if(this.room){
            this.room.update()
        }
    
    }
}