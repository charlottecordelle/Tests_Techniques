import { Injectable } from '@angular/core';
import { Roofs } from '../models/roofs.interface';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class RoofService {
  createRoof(roofData: Roofs, length: number, width: number, yPosition: number = 15): THREE.Mesh {
    const scale = 100/20;
    const debord = 0.5;

    const totalLength = (length + debord * 2) * scale;
    const totalWidth = (width + debord * 2) * scale;

    const RoofGeometry = new THREE.PlaneGeometry(totalLength, totalWidth);
    const RoofMaterial = new THREE.MeshStandardMaterial({color: 'red', side: THREE.DoubleSide});
    const Roof = new THREE.Mesh(RoofGeometry, RoofMaterial);
    Roof.rotation.x = -Math.PI/2;
    Roof.position.y = yPosition;

    Roof.castShadow = true;
    Roof.receiveShadow = true;
    
    Roof.position.x = (length * scale)/2;
    Roof.position.z = (width * scale)/2;

    return Roof;
  }
}
