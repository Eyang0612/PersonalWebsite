import Experience from "../Experience"
import * as THREE from 'three';
import Resources from "../Utils/Resource";
import { Scene } from "three";
export default class Room{

    experience: Experience;
    scene: THREE.Scene;
    resources: Resources;
   room: any
   actualRoom: Scene


    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene
    
        this.resources = this.experience.resources
        this.room = this.resources.items['room']
        this.actualRoom = this.room.scene
        this.setModel()

        
    
    }

    setModel(){
        this.scene.add(this.actualRoom)
    }

  
    resize() {
      }

    update() {
        
    }
}