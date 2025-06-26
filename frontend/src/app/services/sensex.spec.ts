import { TestBed } from '@angular/core/testing';

import { Sensex } from './sensex';

describe('Sensex', () => {
  let service: Sensex;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sensex);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
