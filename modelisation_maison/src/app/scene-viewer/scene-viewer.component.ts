import { Component } from '@angular/core';
import * as THREE from 'three';
import { ViewChild, Input, ElementRef, OnInit, AfterViewInit, SimpleChanges} from '@angular/core';
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
    const allVisible = this.houseGroup.visible;
    this.houseGroup.traverse((child: any) => {
      if (child.name) {
        child.visible = !allVisible;
      }
    });
    this.houseGroup.visible = !allVisible;
  }

  private updateHouse(): void {
    this.scene.remove(this.houseGroup);
    this.houseGroup = this.houseService.createHouse(this.house);;
    this.scene.add(this.houseGroup);
  }
}
