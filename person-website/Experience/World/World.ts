import Experience from "../Experience"
import Sizes from "../Utils/Sizes"
import Camera from "../Camera"
import Room from "./Room"
import Environment from "./Environment"
import Resources from "../Utils/Resource"

import * as THREE from 'three';
export default class World{

    experience: Experience;
    sizes: Sizes;
    scene: THREE.Scene;
    canvas: any;
    camera: Camera;
    renderer: THREE.WebGLRenderer;
    room: Room;
    environment: Environment;
    resources: Resources;

    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.camera= this.experience.camera;
        
        this.resources = this.experience.resources;

        this.resources.on('ready',()=>{
            this.environment = new Environment();
            this.room = new Room()
        })
        
    
    }

  
    resize() {
        
    }

    update() {
    
    }
}