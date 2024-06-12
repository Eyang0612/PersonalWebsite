import * as THREE from "three";
import Experience from "../Experience.js";

export default class Floor {
    experience:Experience;
    scene:any;
    geometry:THREE.PlaneGeometry
    material:THREE.MeshStandardMaterial
    plane:THREE.Mesh
    circleFirst:THREE.Mesh
        circleSecond:THREE.Mesh
        circleThird:THREE.Mesh
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
    
    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xd3b683,
            side: THREE.BackSide,
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -0.3;
        this.plane.receiveShadow = true;
    }

    
    

    resize() {}

    update() {}
}