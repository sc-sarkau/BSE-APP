import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataModal } from './add-data-modal';

describe('AddDataModal', () => {
  let component: AddDataModal;
  let fixture: ComponentFixture<AddDataModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDataModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDataModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
