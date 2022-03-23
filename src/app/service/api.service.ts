import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, retry, throwError, of} from 'rxjs';
import {Product} from '../entity/product';
import {environment} from 'src/environments/environment';
import {Banner} from '../entity/banner';

export class SearchProduct {
    name: string = "";
    categ: string = "";
    offset: number = 0;
    limit: number = 10;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient,
    ) {
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    getTopSelling(): Observable<Product> {
        return this.http
            .get<Product>(environment.apiUrl + 'produits')
            .pipe(retry(1), catchError(this.handleError));
    }
    
    getSearchAdvancedProducts(tosearch: SearchProduct): Observable<Product> {
        let url = environment.apiUrl + 'searchAdvancedProduct?libelle=' + tosearch.name + '&categorie=' + tosearch.categ + '&offset=' + tosearch.offset + '&limit=' + tosearch.limit;
        return this.http
            .get<Product>(url)
            .pipe(retry(0), catchError((e) => {
                //return of({} as Product).pipe(); // return list [] of observable
                throw e;
            }));
    }

    getBanners(): Observable<Banner> {
        return this.http
            .get<Banner>(environment.apiUrl + 'publicites')
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
}
