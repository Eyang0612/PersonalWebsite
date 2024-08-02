import Experience from "./Experience"
import Sizes from "./Utils/Sizes"
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//Load Camera for Three js model viewing
export default class Camera {
    experience: Experience;
    sizes: Sizes;
    scene: THREE.Scene;
    canvas: any;
    perspectiveCamera: THREE.PerspectiveCamera;
    orthographicCamera: THREE.OrthographicCamera;

    controls: OrbitControls;
    helper: THREE.CameraHelper

    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.createPerspectiveCamera()
        this.createOrthographicCamera()
        this.setOrbitControls();
    }

    //Initialize Perspective Camera for Three js (for testing)
    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 1000);
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.z = 12;
        this.perspectiveCamera.position.x = 29;
        this.perspectiveCamera.position.y = 14;
    }

    //Initialize Orthographic Camera for Three js
    createOrthographicCamera() {

        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -10,
            10
        );

        this.orthographicCamera.position.y = 4;
        this.orthographicCamera.position.z = 3;
        this.orthographicCamera.rotation.x = -Math.PI / 4


        this.scene.add(this.orthographicCamera);
        // this.helper = new THREE.CameraHelper(this.orthographicCamera);
        // this.scene.add(this.helper)

        // const size = 20;
        // const divisions = 20;

        // const gridHelper = new THREE.GridHelper( size, divisions );
        // this.scene.add( gridHelper );

        // const axesHelper = new THREE.AxesHelper( 5 );
        // this.scene.add( axesHelper );

    }

    //Set up perspective Camera (for testing)
    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
        this.controls.enableDamping = true;
        this.controls.enableZoom = true; //true
    }

    //resize camera based on Window size
    resize() {
        this.perspectiveCamera.aspect = this.sizes.aspect
        this.perspectiveCamera.updateProjectionMatrix()

        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2
        this.orthographicCamera.top = this.sizes.frustrum / 2
        this.orthographicCamera.bottom = -this.sizes.frustrum / 2
        this.orthographicCamera.updateProjectionMatrix()
    }
    update() {

        this.controls.update();
        // this.helper.matrixWorldNeedsUpdate = true;
        // this.helper.update();
        // this.helper.position.copy(this.orthographicCamera.position);
        // this.helper.position.copy(this.orthographicCamera.rotation);
    }


}