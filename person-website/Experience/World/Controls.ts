import Experience from "../Experience"
import * as THREE from 'three';
import Resources from "../Utils/Resource";
import Time from "../Utils/Time";
import Camera from "../Camera";
import GSAP from "gsap"
import Sizes from "../Utils/Sizes";

// Control the Button Interaction
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
    room: THREE.Scene;

    lerp: { target: number, current: number, ease: number };
    back: boolean;
    circleFirst: THREE.Mesh
    circleSecond: THREE.Mesh
    circleThird: THREE.Mesh
    icons: NodeListOf<Element>
    iconBox: HTMLElement



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
        if (leftSideButton) {
            leftSideButton.addEventListener("click", () => {
                this.leftSideBarOpenAnimation()
            })
        }
        
        const leftSideButtonClose = document.getElementById("button-left-close")
        if (leftSideButtonClose) {
            leftSideButtonClose.addEventListener("click", () => {
                this.leftSideBarCloseAnimation()
            })
        }

        const rightSideButton = document.getElementById("button-right")
        if (rightSideButton) {
            rightSideButton.addEventListener("click", () => {
                this.rightSideBarOpenAnimation()
            })
        }

        const rightSideButtonClose = document.getElementById("button-right-close")
        if (rightSideButtonClose) {
            rightSideButtonClose.addEventListener("click", () => {
                this.rightSideBarCloseAnimation()
            })
        }

        const leftSideButton2 = document.getElementById("button-left-2")
        if (leftSideButton2) {
            leftSideButton2.addEventListener("click", () => {
                this.leftSideBar2OpenAnimation()
            })
        }

        const leftSideButton2Close = document.getElementById("button-left-close-2")
        if (leftSideButton2Close) {
            leftSideButton2Close.addEventListener("click", () => {
                this.leftSideBar2CloseAnimation()
            })
        }

        const rightSideButton2 = document.getElementById("button-right-2")
        if (rightSideButton2) {
            rightSideButton2.addEventListener("click", () => {
                this.rightSideBar2OpenAnimation()
            })
        }

        const rightSideButton2Close = document.getElementById("button-right-close-2")
        if (rightSideButton2Close) {
            rightSideButton2Close.addEventListener("click", () => {
                this.rightSideBar2CloseAnimation()
            })
        }

        this.bottomBarHandle()

    }

    // Opening animation for the Left side Bar
    leftSideBarOpenAnimation() {
        const leftSideTimeline = GSAP.timeline()
        GSAP.fromTo(
            this.room.position,
            { x: 0, y: 0, z: 0 },
            {
                z: this.sizes.height * 0.005,
                duration: 0.8,
                ease: 'power2.out'
            },
        );
        GSAP.to(
            "#icon-box", {
            translateY: "10vh",
            duration: 0.6,
            ease: 'power2.out'
        }
        )
        GSAP.to(
            this.room.scale,
            {
                x: 3,
                y: 3,
                z: 3,
                duration: 0.8,
                ease: 'power2.out'
            },

        )
        GSAP.fromTo("#hero", { opacity: 1 }, { opacity: 0, duration: 0.25, ease: 'power2.out' })
        leftSideTimeline.to(this.circleFirst.scale, {
            x: 3,
            y: 3,
            z: 3,
            duration: 0.8,
            ease: 'power2.out'
        });
        leftSideTimeline.to("#button-grid", { opacity: 0, duration: 0.25, ease: 'power2.out' });
        leftSideTimeline.to('#left-side-bar', {
            translateX: "0%",
            duration: 0.7,
            ease: 'power3.out',

        }, "-=0.1")
    }

    // Closing animation for Left side bar
    leftSideBarCloseAnimation() {
        const leftSideTimeline = GSAP.timeline()
        GSAP.to(
            this.room.position,
            { x: 0, y: 0, z: 0, duration: 0.7, ease: 'power2.inOut' });
        GSAP.to(
            this.room.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.7,
                ease: 'power2.inOut'
            })
        leftSideTimeline.to('#left-side-bar', {
            translateX: "-100%",
            duration: 0.6,
            ease: 'power3.in'
        })

        leftSideTimeline.to(
            this.circleFirst.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.6,
            ease: 'power2.in'
        }, "-=0.4"
        )
        leftSideTimeline.fromTo(["#hero", "#button-grid"], { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        leftSideTimeline.to(
            "#icon-box", {
            translateY: "0",
            duration: 0.4,
            ease: 'power2.out'
        }, "-=0.2"
        )
    }
    // Opening animation for the Right sider bar
    rightSideBarOpenAnimation() {
        const rightSideTimeline = GSAP.timeline()
        GSAP.to(
            this.room.scale,
            {
                x: 3,
                y: 3,
                z: 3,
                duration: 0.8,
                ease: 'power2.out'
            },
        )
        GSAP.to(
            "#icon-box", {
            translateY: "10vh",
            duration: 0.6,
            ease: 'power2.out'
        }
        )
        GSAP.fromTo("#hero", { opacity: 1 }, { opacity: 0, duration: 0.25, ease: 'power2.out' })
        rightSideTimeline.to(this.circleSecond.scale, {
            x: 3,
            y: 3,
            z: 3,
            duration: 0.8,
            ease: 'power2.out'
        });
        rightSideTimeline.to("#button-grid", { opacity: 0, duration: 0.25, ease: 'power2.out' });
        rightSideTimeline.to('#right-side-bar', {
            translateX: "0%",
            duration: 0.7,
            ease: "power3.out"
        }, "-=0.1")
    }

    // Closing animation for the right side bar
    rightSideBarCloseAnimation() {
        const rightSideTimeline = GSAP.timeline()
        GSAP.to(
            this.room.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.7,
                ease: 'power2.inOut'
            })
        rightSideTimeline.to('#right-side-bar', {
            translateX: "100%",
            duration: 0.6,
            ease: 'power3.in'
        })

        rightSideTimeline.to(
            this.circleSecond.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.6,
            ease: 'power2.in'
        }, "-=0.4"
        )
        rightSideTimeline.fromTo(["#hero", "#button-grid"], { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        rightSideTimeline.to(
            "#icon-box", {
            translateY: "0",
            duration: 0.4,
            ease: 'power2.out'
        }, "-=0.2"
        )
    }

    // Opening animation for the Left side Bar 2 (Skills)
    leftSideBar2OpenAnimation() {
        const leftSideTimeline = GSAP.timeline()
        GSAP.fromTo(
            this.room.position,
            { x: 0, y: 0, z: 0 },
            {
                z: this.sizes.height * 0.005,
                duration: 0.8,
                ease: 'power2.out'
            },
        );
        GSAP.to(
            "#icon-box", {
            translateY: "10vh",
            duration: 0.6,
            ease: 'power2.out'
        }
        )
        GSAP.to(
            this.room.scale,
            {
                x: 3,
                y: 3,
                z: 3,
                duration: 0.8,
                ease: 'power2.out'
            },

        )
        GSAP.fromTo("#hero", { opacity: 1 }, { opacity: 0, duration: 0.25, ease: 'power2.out' })
        leftSideTimeline.to(this.circleFirst.scale, {
            x: 3,
            y: 3,
            z: 3,
            duration: 0.8,
            ease: 'power2.out'
        });
        leftSideTimeline.to("#button-grid", { opacity: 0, duration: 0.25, ease: 'power2.out' });
        leftSideTimeline.to('#left-side-bar-2', {
            left: "0%",
            duration: 0.7,
            ease: 'power3.out',

        }, "-=0.1")
    }

    // Closing animation for Left side bar 2 (Skills)
    leftSideBar2CloseAnimation() {
        const leftSideTimeline = GSAP.timeline()
        GSAP.to(
            this.room.position,
            { x: 0, y: 0, z: 0, duration: 0.7, ease: 'power2.inOut' });
        GSAP.to(
            this.room.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.7,
                ease: 'power2.inOut'
            })
        leftSideTimeline.to('#left-side-bar-2', {
            left: "-100%",
            duration: 0.6,
            ease: 'power3.in'
        })

        leftSideTimeline.to(
            this.circleFirst.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.6,
            ease: 'power2.in'
        }, "-=0.4"
        )
        leftSideTimeline.fromTo(["#hero", "#button-grid"], { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        leftSideTimeline.to(
            "#icon-box", {
            translateY: "0",
            duration: 0.4,
            ease: 'power2.out'
        }, "-=0.2"
        )
    }

    // Opening animation for the Right sider bar 2 (Projects)
    rightSideBar2OpenAnimation() {
        const rightSideTimeline = GSAP.timeline()
        GSAP.to(
            this.room.scale,
            {
                x: 3,
                y: 3,
                z: 3,
                duration: 0.8,
                ease: 'power2.out'
            },
        )
        GSAP.to(
            "#icon-box", {
            translateY: "10vh",
            duration: 0.6,
            ease: 'power2.out'
        }
        )
        GSAP.fromTo("#hero", { opacity: 1 }, { opacity: 0, duration: 0.25, ease: 'power2.out' })
        rightSideTimeline.to(this.circleSecond.scale, {
            x: 3,
            y: 3,
            z: 3,
            duration: 0.8,
            ease: 'power2.out'
        });
        rightSideTimeline.to("#button-grid", { opacity: 0, duration: 0.25, ease: 'power2.out' });
        rightSideTimeline.to('#right-side-bar-2', {
            right: "0%",
            duration: 0.7,
            ease: "power3.out"
        }, "-=0.1")
    }

    // Closing animation for the right side bar 2 (Projects)
    rightSideBar2CloseAnimation() {
        const rightSideTimeline = GSAP.timeline()
        GSAP.to(
            this.room.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.7,
                ease: 'power2.inOut'
            })
        rightSideTimeline.to('#right-side-bar-2', {
            right: "-100%",
            duration: 0.6,
            ease: 'power3.in'
        })

        rightSideTimeline.to(
            this.circleSecond.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.6,
            ease: 'power2.in'
        }, "-=0.4"
        )
        rightSideTimeline.fromTo(["#hero", "#button-grid"], { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        rightSideTimeline.to(
            "#icon-box", {
            translateY: "0",
            duration: 0.4,
            ease: 'power2.out'
        }, "-=0.2"
        )
    }

    //Handle Animation for the Icon, located in the Bottom Bar
    bottomBarHandle() {


        this.iconBox.addEventListener('mouseover', () => {
            GSAP.to(this.circleThird.scale, {
                x: 3,
                y: 3,
                z: 3,
                duration: 0.5
            });

        });
        this.iconBox.addEventListener('mouseleave', () => {
            GSAP.to(this.circleThird.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.5
            });
        });

        this.icons.forEach(icon => {
            icon.addEventListener('mouseover', () => {
                GSAP.to(`#${icon.id}`, {
                    fontSize: "60px",
                    delay: 0.1,
                    ease: "back.out"
                })
            })
            icon.addEventListener('mouseleave', () => {
                GSAP.to(`#${icon.id}`, {
                    fontSize: "24px",
                    delay: 0.1
                })
            })
        })

    }


    update() {



    }
}