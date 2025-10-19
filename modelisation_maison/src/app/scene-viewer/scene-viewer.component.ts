import { Component } from '@angular/core';
import * as THREE from 'three';
import { ViewChild, Input, ElementRef, OnInit, AfterViewInit, SimpleChanges, HostListener } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Houses } from '../models/houses.interface';
import { HouseService } from '../services/house.service';
import { testHouse } from '../data/house-data';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-scene-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scene-viewer.component.html',
  styleUrl: './scene-viewer.component.css'
})
export class SceneViewer implements OnInit, AfterViewInit {
  @ViewChild('canvas', {static : true}) private canvasRef!: ElementRef;
  @Input() house: Houses = testHouse
  @Input() backgroundColor: string = '#bde0fe';
 
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private houseGroup!: THREE.Group;
 
  constructor(private houseService: HouseService) {}
 
  ngOnInit(): void {
    this.scene = new THREE.Scene();
  }

  ngAfterViewInit(): void {
    this.initThree();
    this.animate();
  }
 
  ngOnChanges(changes: SimpleChanges) {
    if (!this.houseGroup) return;
 
    if (changes['backgroundColor']) {
      this.renderer.setClearColor(new THREE.Color(this.backgroundColor));
    }
 
    if (changes['house']) {
      this.updateHouse();
    }
  }
 
  private initThree(): void {
    console.log(this.house);
    const container = this.canvasRef.nativeElement;
 
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: container });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setClearColor(this.backgroundColor);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
 
    this.camera = new THREE.PerspectiveCamera(
      100,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(-45, 40, -45);
    this.camera.lookAt(0, 0, 0);
 
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; 
    this.controls.dampingFactor = 0.05;
 
    this.houseGroup = this.houseService.createHouse(this.house);
    this.scene.add(this.houseGroup);
 
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambient);
 
    const sun = new THREE.DirectionalLight(0xffffff, 0.8);
    sun.position.set(50, 50, 50);
    sun.castShadow = true;
    sun.shadow.camera.left = -50;
    sun.shadow.camera.right = 50;
    sun.shadow.camera.top = 50;
    sun.shadow.camera.bottom = -50;
    this.scene.add(sun);
 
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-30, 20, -30);
    this.scene.add(fillLight);
 
    const axesHelper = new THREE.AxesHelper(200);
    this.scene.add(axesHelper);

    const resetCamera = () => {
      this.camera.position.set(-45, 40, -45);
      this.controls.target.set(0, 0, 0);
      this.controls.update();
    };    
  
    document.getElementById("resetcamera")!.addEventListener("click", () => {
      resetCamera();
    });
  }
 
  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
 
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    const container = this.canvasRef.nativeElement;
    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }

  toggleVisibility(name: string) {
    if (!this.houseGroup) return;
    this.houseGroup.traverse((child: any) => {
      if (child.name && child.name.toLowerCase().includes(name.toLowerCase())) {
        child.visible = !child.visible;
      }
    });
  }
 
  toggleAllVisibility() {
    if (!this.houseGroup) return;
    const allVisible = this.houseGroup.visible; // si la maison est visible
    this.houseGroup.traverse((child: any) => {
      if (child.name) {
        child.visible = !allVisible;
      }
    });
    this.houseGroup.visible = !allVisible; // inverse l’état global
  }

  private updateHouse(): void {
    this.scene.remove(this.houseGroup);
    this.houseGroup = this.houseService.createHouse(this.house);;
    this.scene.add(this.houseGroup);
  }
}
