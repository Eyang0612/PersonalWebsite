import Experience from "../Experience"
import * as THREE from 'three';
import Resources from "../Utils/Resource";
export default class Environment{

    experience: Experience;
    scene: THREE.Scene;
    resources: Resources;
    sunlight: any;
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
        this.sunlight.shadow.mapSize.set(2048,2048);
        this.sunlight.shadow.normalBias = 0.05;

        this.sunlight.position.set(0, 2, 2);

        
        this.scene.add(this.sunlight);

        // const sphereSize = 1;
// const pointLightHelper = new THREE.DirectionalLightHelper( this.sunlight, sphereSize );
// this.scene.add( pointLightHelper );

        this.ambientlight = new THREE.AmbientLight("#ffffff", 1);
        this.scene.add(this.ambientlight);
    
    }

  
    resize() {
      }

    update() {
        
    }
}