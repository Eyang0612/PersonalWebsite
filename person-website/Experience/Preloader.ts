import Experience from "./Experience"
import Sizes from "./Utils/Sizes"
import Camera from "./Camera"
import GSAP from "gsap"
import * as THREE from 'three';
import { EventEmitter } from "events";
import World from "./World/World";
import SplitType from "split-type"
import Theme from "./Theme";
export default class Preloader extends EventEmitter {

    experience: Experience;
    sizes: Sizes;
    scene: THREE.Scene;
    canvas: any;
    camera: Camera;
    renderer: THREE.WebGLRenderer;
    room: THREE.Scene
    roomChildren: Object;
    world: World;
    theme:Theme;


    constructor() {
        super()
        this.experience = new Experience();
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.camera = this.experience.camera;
        this.theme = this.experience.theme

        this.world = this.experience.world
        this.world.on("worldready", () => {
            this.room = this.experience.world.room.actualRoom;
            this.roomChildren = this.experience.world.room.roomChildren;
            this.firstIntro()
            const preloaderButton = document.getElementById("preloader-button")
            preloaderButton.addEventListener("click", () => {
                preloaderButton['disabled'] = true;
                this.secondIntro()
            })
        })
    }

    firstIntro() {

        GSAP.to("#theme-button",{
            opacity:1,
        })

        let preloaderSplit = new SplitType('#preloader h1', {
            types: 'lines,words,chars',
            tagName: 'span'
          })
        

        document.getElementById("loader").style.display = "none"
        const preloaderTimeline = GSAP.timeline()
        preloaderTimeline.to(this.roomChildren["room"]["scale"], {
            x: 0.2,
            y: 0.2,
            z: 0.2,
            duration: 1.5,
            ease: "bounce.out"
        });
        preloaderTimeline.to("#preloader", {
            opacity: 1,
            duration: 0.2
        });
        preloaderTimeline.from('#preloader h1 .char', {
            x: '100%',
            opacity: 0,
            duration: 0.3,
            ease: 'power1.out',
            stagger: 0.1,
          })
          preloaderTimeline.from('#preloader #preloader-button', {
            y: '50%',
            opacity: 0,
            duration: 0.5,
            ease: 'power1.out'
          })

    }
    async secondIntro() {

        await this.moveCube()
        await this.loadItemPart1()
        
        this.loadItemPart3()
        await this.loadItemPart2()
        this.loadItemPart4()
        await this.loadItemPart5()
        await this.loadText()
        await this.loadButton();
        this.emit("enablecontrols")
        //    this.loadShadow()
    }

    moveCube() {
        return new Promise((resolve) => {
            const preloaderTimeline = GSAP.timeline()
            preloaderTimeline.to("#preloader", {
                opacity: 0,
                duration: 0.4
            }).to(this.roomChildren["room"]["rotation"], {
                y: this.roomChildren["room"]["rotation"]["y"] - Math.PI,
                x: this.roomChildren["room"]["rotation"]["x"] + Math.PI / 2,
                duration: 0.5
            }).to(this.roomChildren["room"]["position"], {
                x: 0,
                y: 0,
                z: this.roomChildren["room"]["position"]["z"] + 1,
                duration: 0.5
            }).to(this.roomChildren["room"]["scale"], {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.5,
                ease: "back.out(2.5)",
                onComplete: resolve
            });
        })
    }

    loadItemPart1() {
        return new Promise((resolve) => {
            const preloaderTimeline = GSAP.timeline()
            for (let child in this.roomChildren) {

                if (child !== 'room' && child !== "rectLight" && child[0] === "1") {
                    preloaderTimeline.to(this.roomChildren[child]["position"],
                        {
                            y: this.roomChildren[child]["position"]["y"] + 2,
                            duration: 0.15,
                            ease: 'back.out',
                            
                        })
                }
            }
            preloaderTimeline.add(resolve)
        });
    }

    loadItemPart2() {
        return new Promise((resolve) => {
            const preloaderTimeline = GSAP.timeline()
            for (let child in this.roomChildren) {

                if (child !== 'room' && child !== "rectLight" && child[0] === "2") {
                    preloaderTimeline.to(this.roomChildren[child]["position"],
                        {
                            y: this.roomChildren[child]["position"]["y"] + 2,
                            duration: 0.2,
                            ease: 'back.out',
                            
                        })
                }
            }

            preloaderTimeline.add(resolve)
        });
    }
    
    loadItemPart3() {
        return new Promise((resolve) => {
            const preloaderTimeline = GSAP.timeline()
            for (let child in this.roomChildren) {

                if (child !== 'room' && child !== "rectLight" && child[0] === "3") {
                    preloaderTimeline.to(this.roomChildren[child]["position"],
                        {
                            y: this.roomChildren[child]["position"]["y"] + 2,
                            duration: 0.2,
                            ease: 'back.out',
                            
                        })
                }
            }

            preloaderTimeline.add(resolve)
        });
    }

    loadItemPart4() {
        return new Promise((resolve) => {
            const preloaderTimeline = GSAP.timeline()
            for (let child in this.roomChildren) {

                if (child !== 'room' && child !== "rectLight" && child[0] === "4") {
                    preloaderTimeline.to(this.roomChildren[child]["position"],
                        {
                            y: this.roomChildren[child]["position"]["y"] + 2,
                            duration: 0.2,
                            ease: 'back.out',
                            
                        })
                }
            }
            preloaderTimeline.add(resolve)
        });
    }

    loadItemPart5() {
        return new Promise((resolve) => {
            const preloaderTimeline = GSAP.timeline()
            for (let child in this.roomChildren) {

                if (child !== 'room' && child !== "rectLight" && child[0] === "5") {
                    preloaderTimeline.to(this.roomChildren[child]["position"],
                        {
                            y: this.roomChildren[child]["position"]["y"] + 2,
                            duration: 0.2,
                            ease: 'back.out',
                            
                        })
                }
            }
            preloaderTimeline.to(this.roomChildren["rectLight"],{
                width:0.5,
                height:0.5,
            })
            if(this.theme.theme === "dark"){
                preloaderTimeline.to(this.roomChildren["rectLight"],{
                    intensity:1,
                })
            }
            preloaderTimeline.add(resolve)
        });
    }

    loadText(){
        return new Promise((resolve) => {
        const preloaderTimeline = GSAP.timeline()
            preloaderTimeline.fromTo("#hero",{opacity:0},
                { opacity: 1, duration: 0.5 })
        
let titleSplit = new SplitType('#hero-paragraph-upper p', {
  types: 'lines,words,chars',
  tagName: 'span'
})

let descriptionSplit = new SplitType('#hero-paragraph-lower p', {
    types: 'lines,words,chars',
    tagName: 'span'
  })

preloaderTimeline.from('#hero-paragraph-lower p .word', {
  y: '100%',
  opacity: 0,
  duration: 0.5,
  ease: 'power1.out',
  stagger: 0.1,
})


preloaderTimeline.from('#hero-paragraph-upper p .word', {
    y: '100%',
    opacity: 0,
    duration: 0.5,
    ease: 'power1.out',
    stagger: 0.1,
    onComplete:resolve
    
  })
        })

        
    }

    loadButton() {
        return new Promise((resolve) => {
            
            const preloaderTimeline = GSAP.timeline()
            preloaderTimeline.to("#button-horizontal",
                    { opacity: 1, duration: 0.5})
            preloaderTimeline.pause(0.5)
            preloaderTimeline.resume()
            const icons = document.querySelectorAll('#icon-box a');
            icons.forEach(icon => {
                preloaderTimeline.to(
                    `#${icon.id}`, {
                    translateY: "0",
                    duration: 0.2,
                    ease: "back.out"
                }
                )

            })
            preloaderTimeline.add(resolve)
        }
        )
    }




    // loadShadow(){
    //     for(let child in this.roomChildren){

    //         if(child !== "room"){
    //             this.roomChildren[child].castShadow = true;
    //             this.roomChildren[child].receiveShadow = true;
    //              if(this.roomChildren[child] instanceof THREE.Group || this.roomChildren[child] instanceof THREE.Object3D){

    //                 this.roomChildren[child].children.forEach(groupChild => {
    //                      groupChild.castShadow = true;
    //                     groupChild.receiveShadow = true;

    //                 })

    //              }
    //         }
    //     }

    // }

    resize() {

    }

    update() {

    }
}