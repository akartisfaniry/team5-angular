import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Product } from '../entity/product';
import { environment } from 'src/environments/environment';

export interface LoginResponse {
  access_token: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getTopSelling(): Observable<Product>
  {
    return this.http
          .get<Product>(environment.apiUrl+'produits')
          .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  async doLogin(username: string, password: string): Promise<LoginResponse | void> {
    const url = environment.apiUrl+"login";
    const body = {"username": username, "password": password};
    const options = {headers: {'Content-Type': 'application/json'}};
    return await this.http.post<LoginResponse>(url,body,options).toPromise().then(res => {
      console.log(res);
      return res as LoginResponse;
    }).catch(err => {
      console.log({err});
    });

    //static return
    //return Promise.resolve({access_token: "null"} as LoginResponse);
  }


}
