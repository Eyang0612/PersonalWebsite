import Experience from "../Experience"
import * as THREE from 'three';
import Resources from "../Utils/Resource";
import GSAP from "gsap"
import Room from "./Room";
export default class Environment{

    experience: Experience;
    scene: THREE.Scene;
    resources: Resources;
    sunlight: any;
    ambientlight: THREE.AmbientLight
    room:Room
    roomChildren: Object;


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
        this.sunlight.shadow.mapSize.set(4096,4096);
        this.sunlight.shadow.normalBias = 0.05;

        this.sunlight.position.set(0.5, 8, 4);

        
        this.scene.add(this.sunlight);

        // const sphereSize = 1;
// const pointLightHelper = new THREE.DirectionalLightHelper( this.sunlight, sphereSize );
// this.scene.add( pointLightHelper );

        this.ambientlight = new THREE.AmbientLight("#ffffff", 1);
        this.scene.add(this.ambientlight);
    
    }

    switchTheme(theme) {
        // console.log(this.sunLight);
        if (theme === "dark") {
            GSAP.to(this.sunlight.color, {
                r: 0.17254901960784313,
                g: 0.23137254901960785,
                b: 0.6862745098039216,
            });
            GSAP.to(this.ambientlight.color, {
                r: 0.17254901960784313,
                g: 0.23137254901960785,
                b: 0.6862745098039216,
            });
            GSAP.to(this.sunlight, {
                intensity: 0.78,
            });
            GSAP.to(this.ambientlight, {
                intensity: 0.78,
            });
            if(this.roomChildren){
                GSAP.to(this.roomChildren["rectLight"], {
                    width:0.5,
                    height:0.5
                });
            }
        } else {
            GSAP.to(this.sunlight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.ambientlight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.sunlight, {
                intensity: 3,
            });
            GSAP.to(this.ambientlight, {
                intensity: 1,
            });
            if(this.roomChildren){
                GSAP.to(this.roomChildren["rectLight"], {
                    width:0,
                    height:0
                });
            }
        }
    }

  
    resize() {
      }

    update() {
        
    }
}