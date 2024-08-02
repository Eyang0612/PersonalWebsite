import Experience from "../Experience"
import * as THREE from 'three';
import Resources from "../Utils/Resource";
import GSAP from "gsap"
import Room from "./Room";

//Load/Change Enviromental Lighting based on theme
export default class Environment {

    experience: Experience;
    scene: THREE.Scene;
    resources: Resources;
    sunlight: any;
    ambientlight: THREE.AmbientLight
    room: Room
    roomChildren: Object;
    lamplightReady: Boolean;
    plane: THREE.Mesh


    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.plane = this.experience.world.floor.plane
        this.lamplightReady = false;

        this.setSunlight()



    }

    //Load Sunlight Object in Three Js
    setSunlight() {
        this.sunlight = new THREE.DirectionalLight("#ffffff", 3)
        this.sunlight.castShadow = true;
        this.sunlight.shadow.camera.far = 20;
        this.sunlight.shadow.mapSize.set(4096, 4096);
        this.sunlight.shadow.normalBias = 0.05;

        this.sunlight.position.set(0.5, 8, 4);


        this.scene.add(this.sunlight);

        // const sphereSize = 1;
        // const pointLightHelper = new THREE.DirectionalLightHelper( this.sunlight, sphereSize );
        // this.scene.add( pointLightHelper );

        this.ambientlight = new THREE.AmbientLight("#ffffff", 1);
        this.scene.add(this.ambientlight);

    }

    //Adjust lighting based on light/dark theme
    switchTheme(theme) {

        //dark them
        if (theme === "dark") {
            this.plane.material['color'].setHex(0x121212)
            GSAP.to(this.sunlight.color, {
                r: 0.1,
                g: 0.1,
                b: 0.1,

            });
            GSAP.to(this.ambientlight.color, {
                r: 0.5,
                g: 0.5,
                b: 0.5,
            });
            GSAP.to(this.sunlight, {
                intensity: 0.78,
            });
            GSAP.to(this.ambientlight, {
                intensity: 0.78,
            });
            if (this.roomChildren && this.lamplightReady) {
                GSAP.to(this.roomChildren["rectLight"], {
                    intensity: 2,
                });
            }
            //light theme
        } else {
            this.plane.material['color'].setHex(0xa3b2ff)
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
            if (this.roomChildren) {
                GSAP.to(this.roomChildren["rectLight"], {
                    intensity: 0,
                });
            }
        }
    }


    resize() {
    }

    update() {

    }
}