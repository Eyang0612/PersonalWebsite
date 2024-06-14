import Experience from "../Experience"
import * as THREE from 'three';
import Resources from "../Utils/Resource";
import Time from "../Utils/Time";
import Camera from "../Camera";
export default class Controls {

    experience: Experience;
    scene: THREE.Scene;
    resources: Resources;
    curve: THREE.CatmullRomCurve3;
    progress: number;
    position: THREE.Vector3;
    lookAtPosition: THREE.Vector3;
    directionalVector: THREE.Vector3;
    staticVector: THREE.Vector3;
    crossVector: THREE.Vector3;
    camera: Camera;
    time: Time;
    lerp: {target:number, current:number,ease:number};
    back:boolean;



    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene

        this.resources = this.experience.resources
        this.camera = this.experience.camera;
        this.time = this.experience.time

       


    }

    




    update() {
       

        
    }
}