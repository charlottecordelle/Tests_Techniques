import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneViewer } from './scene-viewer.component';

describe('SceneViewerComponent', () => {
  let component: SceneViewer;
  let fixture: ComponentFixture<SceneViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SceneViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
