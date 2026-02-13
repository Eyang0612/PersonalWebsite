import Experience from "./Experience"
import Sizes from "./Utils/Sizes"
import Camera from "./Camera"
import * as THREE from 'three';

// Render Model and Elements for Three.js 
export default class Renderer{

    experience: Experience;
    sizes: Sizes;
    scene: THREE.Scene;
    canvas: any;
    camera: Camera;
    renderer: THREE.WebGLRenderer;


    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.camera= this.experience.camera;

        this.setRenderer();
        
    
    }

    // Set up WebGLRenderer for Three js
    setRenderer(){
        // Detect mobile devices for conditional optimizations
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        this.renderer = new THREE.WebGLRenderer({
            canvas:this.canvas,
            antialias: !isMobile, // Disable on mobile for better performance
            powerPreference: "high-performance",
        })

        this.renderer.toneMapping = THREE.LinearToneMapping;
        this.renderer.toneMappingExposure = 1.5;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Better performance than VSM
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Clamp pixel ratio
    }

  //resize Renderer based on window change
    resize() {
        this.renderer.setSize(this.sizes.width,this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Clamp pixel ratio
    }

    //update Three Js Scene 
    update() {
        // this.renderer.setViewport(0,0,this.sizes.width,this.sizes.height)
        this.renderer.render(this.scene, this.camera.orthographicCamera);
        // this.renderer.setScissorTest(true);
        // this.renderer.setViewport(this.sizes.width -this.sizes.width/3,
        // this.sizes.height -this.sizes.height/3,
        // this.sizes.width/3,this.sizes.height/3)
        // this.renderer.setScissor(this.sizes.width -this.sizes.width/3,
        // this.sizes.height -this.sizes.height/3,
        // this.sizes.width/3,this.sizes.height/3)
        // this.renderer.render(this.scene, this.camera.perspectiveCamera);
       
        // this.renderer.setScissorTest(false);
    }
}