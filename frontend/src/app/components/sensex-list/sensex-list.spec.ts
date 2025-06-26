import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensexList } from './sensex-list';

describe('SensexList', () => {
  let component: SensexList;
  let fixture: ComponentFixture<SensexList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensexList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensexList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
