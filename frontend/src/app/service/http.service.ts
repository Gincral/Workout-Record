import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get( url: string, params: any ): Observable<Object> {
    const options = { headers: null, params: params };
    return this.http.get(url, options);
  }

  post( url: string, body: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers };
    return this.http.post(url, body, options);
  }

  delete( url: string, params: any){
    const options = { headers: null, param: params };
    return this.http.delete(url, options);
  }

  private handleError(err: any) {
    return throwError(err);
  }
}