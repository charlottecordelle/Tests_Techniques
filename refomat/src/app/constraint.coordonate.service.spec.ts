import { TestBed } from '@angular/core/testing';

import { ConstraintCoordonateService } from './constraint.coordonate.service';

describe('ConstraintCoordonateService', () => {
  let service: ConstraintCoordonateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstraintCoordonateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
