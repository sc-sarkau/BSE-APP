import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Sensex {

  constructor() { }
  private baseUrl = `http://localhost:3000/api/sensex`;
  private http = inject(HttpClient);

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  addData(data: any): Observable<any> {
    return this.http.post(this.baseUrl,data);
  }

  updateData(data: any): Observable<any> {
    console.log(data);
    console.log(`${this.baseUrl}/${data._id}`);
    return this.http.put(`${this.baseUrl}/${data._id}`,data);
  }
  deleteData(data: any): Observable<any> {
    console.log(data);
    console.log(`${this.baseUrl}/${data._id}`);
    return this.http.delete(`${this.baseUrl}/${data._id}`,data);
  }
}
