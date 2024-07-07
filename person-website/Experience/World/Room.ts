import Experience from "../Experience"
import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import Resources from "../Utils/Resource";
import { Scene } from "three";
import GSAP from "gsap"
export default class Room{

    experience: Experience;
    scene: THREE.Scene;
    resources: Resources;
   room: any
   actualRoom: Scene
   lerpY: {target:number, current:number,ease:number};
   rotationY:number;
   lerpZ: {target:number, current:number,ease:number};
   rotationZ:number;
   roomChildren: Object;


    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene
    
        this.resources = this.experience.resources
        this.room = this.resources.items['room']
        this.actualRoom = this.room.scene

        this.roomChildren = {};

        this.lerpY = {
            current: 0,
            target: 0,
            ease: 0.1,
        }

        this.lerpZ = {
            current: 0,
            target: 0,
            ease: 0.1,
        }

        this.setModel()
        // this.onMouseMove()

        
    
    }

    setModel(){
        this.actualRoom.children.forEach(child => {
           
            child.castShadow = true;
            child.receiveShadow = true;
            if(child instanceof THREE.Group || child instanceof THREE.Object3D){

                child.children.forEach(groupChild => {
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                    
                })
        
            }
            if (child.name === "282Screen") {
                child['material'] = new THREE.MeshBasicMaterial({
                    map: this.resources.items['screen'],
                });
            }
            if(child.name === "Room"){
       
               child.rotation.y = child.rotation.y + Math.PI
               child.rotation.x = child.rotation.x- Math.PI/2
               
                // child.position.x = child.position.x -2
                child.position.z = child.position.z -1

               
                child.scale.set(0,0,0)
                
            }else{
                child.position.y = child.position.y - 2;
            }
            this.roomChildren[child.name.toLowerCase()] = child;
            
        })

        const width = 0;
        const height = 0;
        const intensity = 0;
        const rectLight = new THREE.PointLight(
            0x548EFF,
            intensity,
            width,
            height
        );
        rectLight.position.set(0.9,1.08, 0);
    

        this.actualRoom.add(rectLight);

        this.roomChildren["rectLight"] = rectLight;

        this.roomChildren = this.sortObject(this.roomChildren)
        console.log(this.roomChildren)
        this.scene.add(this.actualRoom)
    }
    onMouseMove(){
        window.addEventListener("mousemove",(e)=>{
            this.rotationY = (2* (e.clientX - window.innerWidth/2)/window.innerWidth)
            this.lerpY.target = this.rotationY*0.1
            // this.rotationZ = (2* (e.clientY - window.innerHeight/2)/window.innerHeight)
            // this.lerpZ.target = this.rotationZ*0.1
        })
    }

    sortObject(objects:Object){
        return Object.keys(objects).sort().reduce(
            (obj, key) => { 
              obj[key] = objects[key]; 
              return obj;
            }, 
            {}
          );
    }
  
    resize() {
      }

    update() {
        
        this.lerpY.current = GSAP.utils.interpolate(this.lerpY.current,this.lerpY.target,this.lerpY.ease)
        this.actualRoom.rotation.y = this.lerpY.current;
        // this.lerpZ.current = GSAP.utils.interpolate(this.lerpZ.current,this.lerpZ.target,this.lerpZ.ease)
        // this.actualRoom.rotation.x = this.lerpZ.current;
    }
}