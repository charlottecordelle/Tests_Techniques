import { Injectable } from '@angular/core';
import { Windows } from '../models/windows.interface';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class WindowsService {
  private depth: number = 0.2;

  createWindow(windowData: Windows): THREE.Mesh {
    const WindowHeight = (windowData.height || 120)/20;
    const WindowWidth = (windowData.width || 100)/20;

    const WindowGeometry = new THREE.BoxGeometry(WindowWidth, WindowHeight, this.depth);
    const WindowMaterial = new THREE.MeshStandardMaterial({color: 'white'});
    const Window = new THREE.Mesh(WindowGeometry, WindowMaterial);
    Window.castShadow = true,
    Window.receiveShadow = true;

    return Window;
  }
}
