import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ConstraintCoordonateService {

  constructor() {}

  changeCoords(coords : {x: number, y: number, z: number}): THREE.Vector3 {
    return new THREE.Vector3(coords.x, coords.z, coords.y);
  };

  createWall(p1: {x: number, y: number, z: number}, p2: {x: number, y: number, z:number}, height: number = 3.2, ep: number = 0.2): THREE.Mesh {
    const start = this.changeCoords(p1);
    const end = this.changeCoords(p2);

    const dx = end.x - start.x;
    const dz = end.z - start.z;
    const width = Math.sqrt(dx * dx + dz * dz);

    const wallGeometry = new THREE.BoxGeometry(width, height, ep);
    const wallMaterial = new THREE.MeshBasicMaterial({color: 'gray'});
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);

    const midX = (start.x + end.x) / 2;
    const midZ = (start.z + end.z) / 2;
    wall.position.set(midX, height / 2, midZ);

    const angle = Math.atan2(dx, dz);
    wall.rotation.y = -angle

    return wall
  }

  createWallsFromPoints(points: {x:number, y:number, z:number}[], scene: THREE.Scene) {
    const walls: THREE.Mesh[] = [];
  
    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % points.length];
  
      const wall = this.createWall(p1, p2);
      scene.add(wall);
    }
  
    return walls;
  }
}

