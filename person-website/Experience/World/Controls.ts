import Experience from "../Experience"
import * as THREE from 'three';
import Resources from "../Utils/Resource";
import Time from "../Utils/Time";
import Camera from "../Camera";
import GSAP from "gsap"
import Sizes from "../Utils/Sizes";

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
    sizes: Sizes;
    camera: Camera;
    time: Time;
    room:THREE.Scene;
    
    lerp: {target:number, current:number,ease:number};
    back:boolean;
    circleFirst:THREE.Mesh
    circleSecond:THREE.Mesh
    circleThird:THREE.Mesh
    icons:NodeListOf<Element>
    iconBox:HTMLElement



    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.time = this.experience.time

        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThird = this.experience.world.floor.circleThird;

        this.experience.world.room.onMouseMove()

        this.icons = document.querySelectorAll('#icon-box a');

        this.iconBox = document.getElementById('icon-box');
        console.log(this.icons)

       const leftSideButton = document.getElementById("button-left")
       leftSideButton.addEventListener("click",() =>{
        this.leftSideBarOpenAnimation()
       })
       const leftSideButtonClose = document.getElementById("button-left-close")
       leftSideButtonClose.addEventListener("click",() =>{
        this.leftSideBarCloseAnimation()
       })

       const rightSideButton = document.getElementById("button-right")
        rightSideButton.addEventListener("click",() =>{
            this.rightSideBarOpenAnimation()
        
       })

       const rightSideButtonClose = document.getElementById("button-right-close")
       rightSideButtonClose.addEventListener("click",() =>{
        this.rightSideBarCloseAnimation()
       })
        
       this.bottomBarHandle()

    }

    leftSideBarOpenAnimation(){
        const leftSideTimeline = GSAP.timeline()
        GSAP.fromTo(
            this.room.position,
            {x:0,y:0,z:0},
            {
                z: this.sizes.height * 0.005
                
                ,duration:1
            },
        );
        GSAP.to(
            "#icon-box",{
                translateY:"10vh",
                duration:0.5
            }
        )
        GSAP.to(
            this.room.scale,
            {
                x: 3,
                y: 3,
                z: 3,
                duration:1
            },

        )
        GSAP.fromTo("#hero",{opacity:1},{opacity:0,duration:0.2})
        leftSideTimeline.to(this.circleFirst.scale, {
            x: 3,
            y: 3,
            z: 3,
            duration:1
        });
        leftSideTimeline.to("#button-horizontal", { opacity: 0, duration: 0.2 });
        leftSideTimeline.to('#left-side-bar', {
            translateX: "0%",
            duration: 0.5, ease: 'power1.out',
           
          })
    }
    leftSideBarCloseAnimation(){
        const leftSideTimeline = GSAP.timeline()
        GSAP.to(
        this.room.position,
        {x:0,y:0,z:0,duration:0.5});
        GSAP.to(
            this.room.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                duration:0.5
            })
        leftSideTimeline.to('#left-side-bar', {
            translateX: "-100%",
            duration: 0.5,
    })
   
    leftSideTimeline.to(
        this.circleFirst.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration:0.5
        }
    )
        leftSideTimeline.fromTo(["#hero","#button-horizontal"],{opacity:0},{opacity:1,duration:0.2})
        leftSideTimeline.to(
            "#icon-box",{
                translateY:"0",
                duration:0.2
            }
        )
}

rightSideBarOpenAnimation(){
    const rightSideTimeline = GSAP.timeline()
    GSAP.to(
        this.room.scale,
        {
            x: 3,
            y: 3,
            z: 3,
            duration:1
        },
    )
    GSAP.to(
        "#icon-box",{
            translateY:"10vh",
            duration:0.5
        }
    )
    GSAP.fromTo("#hero",{opacity:1},{opacity:0,duration:0.2})
    rightSideTimeline.to(this.circleSecond.scale, {
        x: 3,
        y: 3,
        z: 3,
        duration:1
    });
    rightSideTimeline.to("#button-horizontal", { opacity: 0, duration: 0.2 });
    rightSideTimeline.to('#right-side-bar', {
        translateX: "0%",
        duration: 0.5, ease:"power1.out"
      })
}

rightSideBarCloseAnimation(){
    const rightSideTimeline = GSAP.timeline()
    GSAP.to(
        this.room.scale,
        {
            x: 1,
            y: 1,
            z: 1,
            duration:1
        })
        rightSideTimeline.to('#right-side-bar', {
        translateX: "100%",
        duration: 1,
})

rightSideTimeline.to(
    this.circleSecond.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration:0.5
    }
)
rightSideTimeline.fromTo(["#hero","#button-horizontal"],{opacity:0},{opacity:1,duration:0.2})
rightSideTimeline.to(
    "#icon-box",{
        translateY:"0",
        duration:0.5
    }
)
}

bottomBarHandle(){
    
            
    this.iconBox.addEventListener('mouseover', ()=>{
        GSAP.to(this.circleThird.scale, {
        x: 3,
        y: 3,
        z: 3,
        duration:0.5
    });
        
    });
    this.iconBox.addEventListener('mouseleave', ()=>{
        GSAP.to(this.circleThird.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration:0.5
        });
    });

    this.icons.forEach(icon =>{
        icon.addEventListener('mouseover', ()=>{
                GSAP.to(`#${icon.id}`,{
                    fontSize:"60px",
                    delay:0.1,
                    ease:"back.out"
                })
    })
    icon.addEventListener('mouseleave', ()=>{
        GSAP.to(`#${icon.id}`,{
            fontSize:"24px",
            delay:0.1
        })
})
})
    
}


    update() {
       

        
    }
}