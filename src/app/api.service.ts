import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseUrl = 'https://a86ce643-85d9-419a-a6c0-cd0c6d6bd397.mock.pstmn.io';

  constructor(private http: HttpClient) { }

  dalateServices(Id: any, url: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${url}/${Id}`).pipe(
      catchError(error => {
        console.error('Update shipment failed', error);
        return of(null);
      })
    );
  }
  updateServices(data: any, Id: any, url: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${url}/${Id}`, data).pipe(
      catchError(error => {
        console.error('Update shipment failed', error);
        return of(null); // Return an observable with a null value in case of error
      })
    );
  }

  addServices(data: any, url: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }

    const result = this.http.post<any>(`${this.baseUrl}/${url}`, data, { 'headers': headers });
    return result;
  }

  getServicess(url: any): Observable<any> {
    const result = this.http.get<any>(`${this.baseUrl}/${url}`)
    console.log(result)
    return result;
  }





  addUser(data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const result = this.http.post<any>(`${this.baseUrl}/Users`, data, { 'headers': headers });
    return result;
  }


  logIn(UserName: string, Password: string): Observable<any> {
    let result: any
    try {
      const headers = { 'content-type': 'application/json' }
      result = this.http.post<any>(`${this.baseUrl}/Auth/login`, { UserName: UserName, Password: Password }, { 'headers': headers });
    } catch (error) {
      console.log(error)
    }
    return result;
  }

  // Add more methods to interact with other API endpoints...
}
