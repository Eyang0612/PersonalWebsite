import Experience from "../Experience"
import Sizes from "../Utils/Sizes"
import Camera from "../Camera"
import Room from "./Room"
import Environment from "./Environment"
import Controls from "./Controls"
import Resources from "../Utils/Resource"
import Theme from "../Theme"
import Floor from './Floor'
import * as THREE from 'three';
import { EventEmitter } from "events";

export default class World extends EventEmitter {

    experience: Experience;
    sizes: Sizes;
    scene: THREE.Scene;
    canvas: any;
    camera: Camera;
    renderer: THREE.WebGLRenderer;
    room: Room;
    environment: Environment;
    resources: Resources;
    controls: Controls
    floor:Floor;
    theme:Theme;

    constructor(){
        super()
        this.experience = new Experience();
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.camera= this.experience.camera;
        this.theme = this.experience.theme
        
        this.resources = this.experience.resources;

        this.resources.on('ready',()=>{
            this.environment = new Environment();
            this.room = new Room()
            this.floor = new Floor()
            this.environment.roomChildren = this.room.roomChildren;
     
            this.emit("worldready")
        })
        
        this.theme.on("switch", (theme) => {
            this.switchTheme(theme);
        });
    
    }

    switchTheme(theme) {
        if (this.environment) {
            this.environment.switchTheme(theme);
        }
    }
  
    resize() {
        
    }

    update() {
        if(this.controls){
            this.controls.update()
        }
        if(this.room){
            this.room.update()
        }
    
    }
}