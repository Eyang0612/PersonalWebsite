import Experience from "./Experience"
import Sizes from "./Utils/Sizes"
import * as THREE from 'three';

export default class Camera{
    experience: Experience;
    sizes: Sizes;
    scene: THREE.Scene;
    canvas: any;
    perspectiveCamera: THREE.PerspectiveCamera;
    orthographicCamera: THREE.OrthographicCamera;
    frustrum: number;

    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        
        this.createPerspectiveCamera()
        this.createOrthographicCamera()
    }

    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(35,this.sizes.aspect,0.1,1000);
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.z =5;
    }
    createOrthographicCamera(){
        this.frustrum= 5;
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect/this.frustrum)/2,
            (this.sizes.aspect/this.frustrum)/2,
            this.frustrum/2,
            -this.frustrum/2,
            -100,
            100
        );
        this.scene.add(this.orthographicCamera);
    }
    resize(){
        this.perspectiveCamera.aspect = this.sizes.aspect
        this.perspectiveCamera.updateProjectionMatrix()

        this.orthographicCamera.left =(-this.sizes.aspect/this.frustrum)/2
        this.orthographicCamera.right = (this.sizes.aspect/this.frustrum)/2
        this.orthographicCamera.top = this.frustrum/2
        this.orthographicCamera.bottom = -this.frustrum/2
        this.orthographicCamera.updateProjectionMatrix()
    }
    update(){

    }
}