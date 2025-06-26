import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageGraph } from './average-graph';

describe('AverageGraph', () => {
  let component: AverageGraph;
  let fixture: ComponentFixture<AverageGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AverageGraph]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AverageGraph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
