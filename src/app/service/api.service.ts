import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Product } from '../entity/product';
import { environment } from 'src/environments/environment';
import { Banner } from '../entity/banner';
import { Basket } from '../entity/basket';
import { Categorie } from '../entity/Categorie';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

export class SearchProduct {
  name: string = "";
  categ: string = "";
  offset: number = 0;
  limit: number = 10;
}

export class ResultSearchProduct {
  produits: Product[] = [];
  total: any = 0;
}

export interface LoginResponse {
  access_token: any;
}

export class ResponseData {
  status: string = '';
  message: string =  '';
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
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    }),
  };

  getTopSelling(): Observable<Product>
  {
    return this.http
          .get<Product>(environment.apiUrl+'produits', this.httpOptions)
          .pipe(retry(1), catchError(this.handleError));
  }

  getBanners(): Observable<Banner>
  {
    return this.http
          .get<Banner>(environment.apiUrl+'annonces', this.httpOptions)
          .pipe(retry(1), catchError(this.handleError));
  }

  getBasketsForUserConnected(): Observable<Basket>
  {
    return this.http
          .get<Basket>(environment.apiUrl+'findAllCommandByCurrentUser', this.httpOptions)
          .pipe(retry(1), catchError(this.handleError));
  }

  getCategories(): Observable<Categorie[]>{
    return this.http
        .get<Categorie[]>(environment.apiUrl + 'categories',this.httpOptions)
        .pipe(retry(1), catchError(this.handleError));
  }

  getSearchAdvancedProducts(tosearch: SearchProduct): Observable<ResultSearchProduct> {
    let url = environment.apiUrl + 'searchAdvancedProduct?libelle=' + tosearch.name + '&categorie=' + tosearch.categ + '&offset=' + tosearch.offset + '&limit=' + tosearch.limit;
    return this.http
        .get<ResultSearchProduct>(url,this.httpOptions)
        .pipe(retry(0), catchError((e) => {
          //return of({} as Product).pipe(); // return list [] of observable
          throw e;
        }));
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

  async addBasketForUserConnected(idProduit: number, nombre: number): Promise<ResponseData | void> {
    const url = environment.apiUrl+"insertCommande";
    const body = {idProduit: idProduit, nombre: nombre};
    return await this.http.post<ResponseData>(url,body,this.httpOptions).toPromise().then(res => {
      console.log(res);
      return res as ResponseData;
    }).catch(err => {
      console.log({err});
    });
  }

}
