import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SensexList } from './sensex-list';
import { Sensex } from '../../services/sensex';
import { Auth } from '../../auth';
import { SocketService } from '../../services/socket-service';
import { AverageCalculator } from '../../services/average-calculator';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { NgZone, ChangeDetectorRef } from '@angular/core';

describe('SensexList', () => {
  let component: SensexList;
  let fixture: ComponentFixture<SensexList>;
  let mockSensexService: jasmine.SpyObj<Sensex>;
  let mockAuth: jasmine.SpyObj<Auth>;
  let mockSocketService: jasmine.SpyObj<SocketService>;
  let mockAverageCalculator: jasmine.SpyObj<AverageCalculator>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockSensexService = jasmine.createSpyObj('Sensex', ['getAll', 'addData', 'updateData', 'deleteData']);
    mockAuth = jasmine.createSpyObj('Auth', ['logout']);
    mockSocketService = jasmine.createSpyObj('SocketService', ['listen']);
    mockAverageCalculator = jasmine.createSpyObj('AverageCalculator', ['calculateMonthlyAverage']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SensexList],
      providers: [
        { provide: Sensex, useValue: mockSensexService },
        { provide: Auth, useValue: mockAuth },
        { provide: SocketService, useValue: mockSocketService },
        { provide: AverageCalculator, useValue: mockAverageCalculator },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SensexList);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    const sampleData = [{ _id: '1', date: '2023-01-01', open: 100, close: 110 }];
    mockSensexService.getAll.and.returnValue(of(sampleData));
    mockSocketService.listen.and.returnValue(of());

    component.ngOnInit();

    expect(mockSensexService.getAll).toHaveBeenCalled();
    expect(component.sensexData).toEqual(sampleData);
    expect(component.paginatedData.length).toBeGreaterThan(0);
  });

  // it('should add new data and highlight it', fakeAsync(() => {
  //   const newData = { _id: '123', date: '2018-01-01', open: 100, close: 110 };
  //   mockSensexService.addData.and.returnValue(of(newData));
  //   mockSensexService.getAll.and.returnValue(of([newData]));

  //   component.addNewData(newData);
  //   tick();

  //   expect(component.highlightedId).toEqual('123');
  // }));

  it('should update data', () => {
    const updatedData = { _id: '1', open: 200 };
    mockSensexService.updateData.and.returnValue(of(updatedData));
    mockSensexService.getAll.and.returnValue(of([updatedData]));

    component.currentPage = 2;
    component.updateData(updatedData);

    expect(mockSensexService.updateData).toHaveBeenCalledWith(updatedData);
  });

  it('should delete data and refresh', () => {
    const toDelete = { _id: '1' };
    mockSensexService.deleteData.and.returnValue(of(toDelete));
    mockSensexService.getAll.and.returnValue(of([]));

    component.dataToDelete = toDelete;
    component.deleteData(true);

    expect(mockSensexService.deleteData).toHaveBeenCalledWith(toDelete);
    expect(component.isDeleteOpen).toBeFalse();
  });

  it('should open and close modals', () => {
    component.openModal();
    expect(component.isModalOpen).toBeTrue();

    component.closeModal(false);
    expect(component.isModalOpen).toBeFalse();

    component.closeActionModal(false);
    expect(component.isActionOpen).toBeFalse();

    component.closeDeleteModal(false);
    expect(component.isDeleteOpen).toBeFalse();
  });

  it('should paginate correctly', () => {
    component.sensexData = Array.from({ length: 30 }, (_, i) => ({ _id: i.toString() }));
    component.itemsPerPage = 10;
    component.currentPage = 2;
    component.paginate();

    expect(component.paginatedData.length).toBe(10);
    expect(component.paginatedData[0]._id).toBe('10');
  });

  it('should call logout on auth service', () => {
    component.onLogout();
    expect(mockAuth.logout).toHaveBeenCalled();
  });

  it('should navigate to graph page', () => {
    component.toGraph();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/graph']);
    expect(component.backButtonFlag).toBeTrue();
  });

  it('should set data for update and open action modal', () => {
    const mockItem = { _id: '5' };
    component.handleAction(mockItem);
    expect(component.dataToUpdate).toEqual(mockItem);
    expect(component.isActionOpen).toBeTrue();
  });

  it('should set data for delete and open delete modal', () => {
    const mockItem = { _id: '9' };
    component.handleDelete(mockItem);
    expect(component.dataToDelete).toEqual(mockItem);
    expect(component.isDeleteOpen).toBeTrue();
  });
});
