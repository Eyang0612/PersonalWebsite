import Experience from "./Experience"
import Sizes from "./Utils/Sizes"
import Camera from "./Camera"
import GSAP from "gsap"
import * as THREE from 'three';
import { EventEmitter } from "events";
import World from "./World/World";
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


    constructor() {
        super()
        this.experience = new Experience();
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.camera = this.experience.camera;

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
        document.getElementById("loader").style.display = "none"
        GSAP.to(this.roomChildren["room"]["scale"], {
            x: 0.2,
            y: 0.2,
            z: 0.2,
            duration: 1,
            ease: "bounce.out"
        });
        GSAP.to("#preloader", {
            opacity: 1,
            duration: 1, delay: 1
        });

    }
    async secondIntro() {

        await this.moveCube()
        await this.loadFloor()
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
                x: this.roomChildren["room"]["position"]["x"] + 2,
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

    loadFloor() {
        return new Promise((resolve) => {
            const preloaderTimeline = GSAP.timeline()
            for (let child in this.roomChildren) {

                if (child !== 'room') {
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

    loadButton() {
        return new Promise((resolve) => {
            
            const preloaderTimeline = GSAP.timeline()
            preloaderTimeline.fromTo("#hero",{opacity:0},
                { opacity: 1, duration: 0.5 }).
                to("#button-horizontal",
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