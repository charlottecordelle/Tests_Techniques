import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { ConstraintCoordonateService } from './constraint.coordonate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule]
})
export class AppComponent implements OnInit {
  @ViewChild('rendererCanvas', { static: true })
  rendererCanvas!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  walls: THREE.Mesh[] = [];

  points = [
    { x: 1, y: 4, z: 0 },
    { x: 5, y: 1, z: 0 },
    { x: 8, y: 5, z: 0 },
    { x: 6.5, y: 6, z: 0 },
    { x: 7, y: 6.5, z: 0 },
    { x: 4, y: 7.5, z: 0 },
  ];

  constructor(private wallService: ConstraintCoordonateService) {}

  ngOnInit(): void {
    this.initThree();
    this.animate();
    this.walls = this.wallService.createWallsFromPoints(this.points, this.scene);
  }

  private initThree(): void {
    const canvas = this.rendererCanvas.nativeElement;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#bde0fe');

    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(10, 10, 10);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    this.scene.add(directionalLight);

    const axesHelper = new THREE.AxesHelper(15);
    this.scene.add(axesHelper);
    const gridHelper = new THREE.GridHelper(19);
    this.scene.add(gridHelper);
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}