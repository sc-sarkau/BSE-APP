import { TestBed } from '@angular/core/testing';

import { AverageCalculator } from './average-calculator';

describe('AverageCalculator', () => {
  let service: AverageCalculator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AverageCalculator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
