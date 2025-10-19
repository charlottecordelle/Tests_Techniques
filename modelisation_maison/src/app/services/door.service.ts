import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { Doors } from '../models/doors.interface';

@Injectable({
  providedIn: 'root'
})
export class DoorService {
  private depth: number = 0.2;
  constructor() { }

  createDoor(doorData: Doors): THREE.Mesh {
    const doorHeight = (doorData.height || 200)/20;
    const doorWidth = (doorData.width || 80)/20;

    const DoorGeometry = new THREE.BoxGeometry(doorWidth, doorHeight, this.depth);
    const DoorMaterial = new THREE.MeshStandardMaterial({color: 'brown'});
    const Door = new THREE.Mesh(DoorGeometry, DoorMaterial);
    Door.name = 'door';
    Door.castShadow = true;
    Door.receiveShadow = true;

    return Door
  }
}
