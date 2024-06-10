import Experience from "../Experience"
import * as THREE from 'three';
import Resources from "../Utils/Resource";
import { Scene } from "three";
export default class Environment{

    experience: Experience;
    scene: THREE.Scene;
    resources: Resources;
    sunlight: THREE.DirectionalLight;
    ambientlight: THREE.AmbientLight


    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene
    
        this.resources = this.experience.resources
        this.setSunlight()

        
    
    }

    setSunlight(){
        this.sunlight = new THREE.DirectionalLight("#ffffff",3)
        this.sunlight.castShadow = true;
        this.sunlight.shadow.camera.far = 20;
        this.sunlight.shadow.mapSize.set(1024,1024);
        this.sunlight.shadow.normalBias = 0.05;

        this.sunlight.position.set(1, 7, 3);
        this.scene.add(this.sunlight);

        // this.ambientlight = new THREE.AmbientLight("#ffffff", 1);
        // this.scene.add(this.ambientlight);
    
    }

  
    resize() {
      }

    update() {
        
    }
}