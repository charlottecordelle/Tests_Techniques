import { Host, Injectable } from '@angular/core';
import { LevelService } from './level.service';
import { RoofService } from './roof.service';
import { Houses } from '../models/houses.interface';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private readonly scaleFactor = 100/20;
  constructor(
    private levelService: LevelService,
    private roofService: RoofService
  ) {}

  createHouse(house: Houses): THREE.Group {
    const houseGroup = new THREE.Group();
    let totalHeight = 0;
    let baseLength = 0;
    let baseWidth = 0;  

    if (house.levels && house.levels.length > 0){
      const firstLevel = house.levels[0];
      if (firstLevel.walls.length >= 2) {
        baseLength = firstLevel.walls[0].length;
        baseWidth = firstLevel.walls[1].length;
      }

      house.levels.forEach(level => {
        const levelMesh = this.levelService.createLevel(level);
        houseGroup.add(levelMesh);
        totalHeight += (level.hsp || 0)*this.scaleFactor;
      });
    }

    if (house.roof){
      const roofMesh = this.roofService.createRoof(house.roof, baseLength, baseWidth, totalHeight);
      houseGroup.add(roofMesh);
    }

    return houseGroup;
  }
}
