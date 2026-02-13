import Experience from "./Experience"
import Sizes from "./Utils/Sizes"
import Camera from "./Camera"
import GSAP from "gsap"
import * as THREE from 'three';
import { EventEmitter } from "events";
import World from "./World/World";
import SplitType from "split-type"
import Theme from "./Theme";

//Set up loading/preloading screens before main section
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
    theme: Theme;


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

    //Load first Intro for entering website
    firstIntro() {

        GSAP.to("#theme-button", {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
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
            duration: 1.05,
            ease: "back.out(1.4)"
        });
        preloaderTimeline.to("#preloader", {
            opacity: 1,
            duration: 0.14,
            ease: 'power2.out'
        });
        preloaderTimeline.from('#preloader h1 .word', {
            y: '-100%',
            opacity: 0,
            duration: 0.35,
            ease: 'power2.out',
            stagger: 0.14,
        })
        preloaderTimeline.from('#preloader #preloader-button', {
            y: '50%',
            opacity: 0,
            duration: 0.35,
            ease: 'power2.out'
        })

    }

    // Load second Intro after website initiation
    async secondIntro() {

        await this.moveCube()
        await this.loadAllItems()
        this.emit("enablecontrols")
        await this.loadText()
        await this.loadButton();
        

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
                duration: 0.4,
                ease: "power2.inOut"
            }).to(this.roomChildren["room"]["position"], {
                x: 0,
                y: 0,
                z: this.roomChildren["room"]["position"]["z"] + 1,
                duration: 0.4,
                ease: "power2.inOut"
            }).to(this.roomChildren["room"]["scale"], {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.7,
                ease: "back.out(1.7)",
                onComplete: resolve
            });
        })
    }

    loadAllItems() {
        return new Promise((resolve) => {
            const preloaderTimeline = GSAP.timeline()
            const items = [];
            
            // Collect all items to animate
            for (let child in this.roomChildren) {
                if (child !== 'room' && child !== "rectLight") {
                    items.push({
                        name: child,
                        position: this.roomChildren[child]["position"]
                    });
                }
            }
            
            // Animate all items with stagger for smooth wave effect
            items.forEach((item, index) => {
                preloaderTimeline.to(item.position, {
                    y: item.position.y + 2,
                    duration: 0.5,
                    ease: 'power2.out',
                }, index * 0.03); // Stagger by 0.03s for smooth wave
            });
            
            // Animate light
            preloaderTimeline.to(this.roomChildren["rectLight"], {
                width: 1,
                height: 1,
            }, "-=0.2")
            
            if (this.theme.theme === "dark") {
                preloaderTimeline.to(this.roomChildren["rectLight"], {
                    intensity: 2,
                    duration: 0.3
                });
            }
            
            preloaderTimeline.add(resolve)
        });
    }



    loadText() {
        return new Promise((resolve) => {
            const preloaderTimeline = GSAP.timeline()
            preloaderTimeline.fromTo("#hero", { opacity: 0 },
                { opacity: 1, duration: 0.2 })

            let titleSplit = new SplitType('#hero-paragraph h1', {
                types: 'lines,words,chars',
                tagName: 'span'
            })

            let descriptionSplit = new SplitType('#hero-paragraph p', {
                types: 'lines,words,chars',
                tagName: 'span'
            })

            

           

            preloaderTimeline.from('#hero-paragraph h1 .word', {
                y: '100%',
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.04,
            })


            preloaderTimeline.from('#hero-paragraph p .word', {
                y: '100%',
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.04,
                onComplete: resolve

            })
        })


    }

    loadButton() {
        return new Promise((resolve) => {

            const preloaderTimeline = GSAP.timeline()
            preloaderTimeline.to("#button-grid",
                {
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out',
          
            })
   
            const icons = document.querySelectorAll('#icon-box a');
            icons.forEach((icon, index) => {
                preloaderTimeline.to(
                    `#${icon.id}`, {
                    translateY: "0",
                    duration: 0.35,
                    ease: "power2.out"
                }, index * 0.05 // Stagger icons
                )

            })
            preloaderTimeline.add(resolve)
        }
        )
    }





    resize() {

    }

    update() {

    }
}