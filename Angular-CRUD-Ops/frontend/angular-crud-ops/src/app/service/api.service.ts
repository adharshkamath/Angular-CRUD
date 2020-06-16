import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseUri = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }


  createEmployee(data): Observable<any> {
    const url = `${this.baseUri}/create`;
    data.appliedForAppraisal = false;
    data.requestedAppraisal = 0;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }


  getEmployees() {
    return this.http.get(`${this.baseUri}`);
  }


  getEmployee(id): Observable<any> {
    const url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }


  updateEmployee(id, data): Observable<any> {
    const url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }


  deleteEmployee(id): Observable<any> {
    const url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }


  getApplications(): Observable<any> {
    const url = `${this.baseUri}/applications`;
    return this.http.get(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }


  approveApplication(id, raise): Observable<any> {
    const url = `${this.baseUri}/approve/${id}`;
    return this.http.put(url, raise, { headers: this.headers}).pipe(
      catchError(this.errorMgmt)
    );
  }

  rejectApplication(id): Observable<any> {
    const url = `${this.baseUri}/reject/${id}`;
    return this.http.put(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }


  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
