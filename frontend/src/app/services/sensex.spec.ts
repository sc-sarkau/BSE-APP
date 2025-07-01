import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Sensex } from './sensex';

describe('Sensex', () => {
  let service: Sensex;
  let httpMock: HttpTestingController;

  const mockData = { _id: '1', value: 1000 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Sensex]
    });

    service = TestBed.inject(Sensex);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all data using getAll()', () => {
    service.getAll().subscribe(data => {
      expect(data).toEqual([mockData]);
    });
    const req = httpMock.expectOne('http://localhost:3000/api/sensex');
    expect(req.request.method).toBe('GET');
    req.flush([mockData]);
  });

  it('should add data using addData()', () => {
    service.addData(mockData).subscribe(response => {
      expect(response).toEqual(mockData);
    });
    const req = httpMock.expectOne('http://localhost:3000/api/sensex');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockData);
    req.flush(mockData);
  });

  it('should update data using updateData()', () => {
    service.updateData(mockData).subscribe(response => {
      expect(response).toEqual(mockData);
    });
    const req = httpMock.expectOne(`http://localhost:3000/api/sensex/${mockData._id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockData);
    req.flush(mockData);
  });

  it('should delete data using deleteData()', () => {
    service.deleteData(mockData).subscribe(response => {
      expect(response).toBeNull();
    });
    const req = httpMock.expectOne(`http://localhost:3000/api/sensex/${mockData._id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
