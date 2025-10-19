import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { DoorService } from './door.service';
import { WindowsService } from './windows.service';
import { Windows as WindowModel } from '../models/windows.interface';
import { Doors as DoorsModel } from '../models/doors.interface';
import { Walls } from '../models/walls.interface';
 
@Injectable({
  providedIn: 'root'
})
export class WallService {
  constructor(private doorService: DoorService, private windowService: WindowsService) {}
 
  createWallWithOpenings(wallData: Walls, levelHsp: number): THREE.Group {
    const wallWidth = (wallData.length || 4) * 100/20;
    const wallHeight = (levelHsp || 2.5) * 100/20;
    const wallDepth = (wallData.ep || 20) / 20;
    const wallGroup = new THREE.Group();
 
    const wallGeometry = new THREE.BoxGeometry(wallWidth, wallHeight, wallDepth);
    const wallMaterial = new THREE.MeshStandardMaterial({color: '939597'});
    const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
 
    let wallCSG = CSG.fromMesh(wallMesh);
 
    wallCSG = this.addWindowOpenings(wallCSG, wallData.windows || [], wallGroup, wallDepth, wallWidth, wallHeight);
    wallCSG = this.addDoorOpenings(wallCSG, wallData.doors || [], wallGroup, wallDepth, wallWidth, wallHeight);
 
    const finalWall = CSG.toMesh(wallCSG, new THREE.Matrix4(), wallMaterial) as THREE.Mesh<THREE.BufferGeometry>; 
    finalWall.name = 'wall';
    finalWall.position.y = wallHeight / 2;
    wallGroup.add(finalWall);
    wallGroup.position.y = wallHeight / 2;
    
    return wallGroup;
  }
 
  private addWindowOpenings(wallCSG: any, windows: WindowModel[], wallGroup: THREE.Group, wallDepth: number, wallWidth: number, wallHeight: number): any {
  windows.forEach(window => {
    const width = (window.width || 100) / 20;
    const height = (window.height || 120) / 20;
    const geometryNew = new THREE.BoxGeometry(width, height, wallDepth + 0.1);
 
    const mesh = new THREE.Mesh(geometryNew);
 
    const locationX = window.location?.x || 0;
    const locationY = window.location?.y || 0;
 
    let x = locationX * 100/20 - wallWidth/2;
    let y = locationY * 100/20 - wallHeight/2;
 
    mesh.position.set(x, y, 0);
    mesh.updateMatrix();
 
    const openingCSG = CSG.fromMesh(mesh);
    wallCSG = wallCSG.subtract(openingCSG);
 
    const windowObject = this.windowService.createWindow(window);
    windowObject.position.set(x, y + wallHeight/2, 0); 
    wallGroup.add(windowObject);
    windowObject.name = 'window';
    });
 
    return wallCSG;
  }
 
  private addDoorOpenings(wallCSG: any, doors: DoorsModel[], wallGroup: THREE.Group, wallDepth: number, wallWidth: number, wallHeight: number) {
  doors.forEach(door => {
    const width = (door.width || 80) / 20;
    const height = (door.height || 200) / 20;
    const geometryNew = new THREE.BoxGeometry(width, height, wallDepth + 0.1);
 
    const mesh = new THREE.Mesh(geometryNew);
 
    const locationX = door.location?.x || 0;
    let x = locationX * 100/20 - wallWidth/2;
    let y = -wallHeight/2 + height/2;
  
    mesh.position.set(x, y, 0);
    mesh.updateMatrix();
  
    const openingCSG = CSG.fromMesh(mesh);
    wallCSG = wallCSG.subtract(openingCSG);
  
    const doorObject = this.doorService.createDoor(door);
    doorObject.position.set(x, y + wallHeight/2, 0);
    wallGroup.add(doorObject);
    doorObject.name = 'door';
    });
 
  return wallCSG;
  }
}