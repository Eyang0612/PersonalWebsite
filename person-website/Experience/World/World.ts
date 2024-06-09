import Experience from "../Experience"
import Sizes from "../Utils/Sizes"
import Camera from "../Camera"
import Room from "./Room"

import * as THREE from 'three';
export default class World{

    experience: Experience;
    sizes: Sizes;
    scene: THREE.Scene;
    canvas: any;
    camera: Camera;
    renderer: THREE.WebGLRenderer;
    room: Room;

    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.camera= this.experience.camera;
        this.room = new Room()
        
    
    }

  
    resize() {
        
    }

    update() {
    
    }
}