import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { WallService } from './wall.service';
import { FloorService } from './floor.service';
import { Levels } from '../models/levels.interface';
 
 
@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private scaleFactor = 100 / 20;
 
  constructor(private wallService: WallService, private floorService: FloorService) {}
 
  createLevel(level: Levels): THREE.Group {
    const levelGroup = new THREE.Group();
 
    for (let wallData of level.walls) {
      const wall = this.wallService.createWallWithOpenings(wallData, level.hsp);
 
      const start = this.applyScaleFactor(wallData.startCoordonates);
      const end = this.applyScaleFactor(wallData.endCoordonates);
 
      const wallPosition = this.calculateWallPosition(start, end);
      wall.position.set(wallPosition.x,wallPosition.y, wallPosition.z );
 
      const wallRotation = this.calculateWallRotation(start, end);
      wall.rotation.set(0, wallRotation.y, 0);
 
      levelGroup.add(wall);
    }
 
    if (level.floor) {
      const floor = this.floorService.createFloor(level.floor, level.walls[0].length);
      levelGroup.add(floor);
    }
 
    return levelGroup;
  }
 
  private applyScaleFactor(coord: { x: number, y: number, z: number }): { x: number, y: number, z: number } {
    return {
      x: coord.x * this.scaleFactor,
      y: coord.y * this.scaleFactor,
      z: coord.z * this.scaleFactor
    };
  }
 
  private calculateWallPosition(start: { x: number, y: number, z: number }, end: { x: number, y: number, z: number }): { x: number, y: number, z: number } {
    const centerX = (start.x + end.x) / 2;
    const centerY = (start.y + end.y) / 2;
    const centerZ = (start.z + end.z) / 2;
 
    return { x: centerX, y: centerY, z: centerZ };
  }
 
  private calculateWallRotation(start: { x: number, y: number, z: number }, end: { x: number, y: number, z: number }): { y: number } {
    const deltaX = end.x - start.x;
    const deltaZ = end.z - start.z;
 
    const angleY = Math.atan2(deltaZ, deltaX);
    return { y: angleY };
  }
 }
