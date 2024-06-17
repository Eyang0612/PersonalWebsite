import Experience from "./Experience"
import Sizes from "./Utils/Sizes"
import Camera from "./Camera"
import GSAP from "gsap"
import * as THREE from 'three';
export default class Preloader{

    experience: Experience;
    sizes: Sizes;
    scene: THREE.Scene;
    canvas: any;
    camera: Camera;
    renderer: THREE.WebGLRenderer;
    room:THREE.Scene
    roomChildren:Object;


    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.camera= this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;

        this.firstIntro()
        const preloaderButton = document.getElementById("preloader-button")
        preloaderButton.addEventListener("click",()=>{
            this.secondIntro()
        
    
    })
}

    firstIntro(){
        document.getElementById("loader").style.display = "none"
        GSAP.to(this.roomChildren["room"]["scale"], {
            x: 0.2,
            y: 0.2,
            z: 0.2,
            duration:2
        });
        GSAP.to("#preloader", {
            opacity:1,
            duration:1,delay:2
        });
        
    }
secondIntro(){
    const preloaderTimeline = GSAP.timeline()
    preloaderTimeline.to("#preloader", {
        opacity:0,
        duration:0.4
    }).to(this.roomChildren["room"]["rotation"], {
        y: this.roomChildren["room"]["rotation"]["y"] - Math.PI,
        x:  this.roomChildren["room"]["rotation"]["x"]+Math.PI/2,
        duration:0.5
    }).to(this.roomChildren["room"]["position"],{
        x:this.roomChildren["room"]["position"]["x"] +2,
        y:0,
        z:this.roomChildren["room"]["position"]["z"] +1,
        duration:0.5
    }).to(this.roomChildren["room"]["scale"],{
        x:1,
        y:1,
        z:1,
        duration:0.5,
        ease: "back.out(2.5)",
    });
    for(let child in this.roomChildren){
        if(child !== "room"){
preloaderTimeline.to(this.roomChildren[child]["position"],{y:this.roomChildren[child]["position"]["y"] -10,duration:0.15,ease: "power1.out"})
        }
    }
    
    preloaderTimeline.to("#hero",
    {opacity:1,duration:0.2}).to("#button-horizontal",
     { opacity: 1, duration: 0.2 });

}
   
  
    resize() {
      
    }

    update() {
   
    }
}