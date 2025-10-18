import { Injectable } from '@angular/core';
import { Floors } from '../models/floors.interface';
import * as THREE from 'three'

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  createFloor(floorData: Floors, length: number): THREE.Mesh {
    const safeLength = length && length > 0 ? length: 10;
    const safeArea = floorData.area && floorData.area > 0 ? floorData.area: 100;
    const width = safeArea/safeLength;

    const FloorGeometry = new THREE.PlaneGeometry(safeLength * 100/20, width * 100/20);
    const FloorMaterial = new THREE.MeshStandardMaterial({color: 'blue', side: THREE.DoubleSide});
    const Floor = new THREE.Mesh(FloorGeometry, FloorMaterial);
    Floor.rotation.x = -Math.PI/2;
    Floor.receiveShadow = true;
    Floor.castShadow = true;
    Floor.position.x = (safeLength * 100/20)/2;
    Floor.position.z = (width * 100/20)/2;

    return Floor;
  }
}