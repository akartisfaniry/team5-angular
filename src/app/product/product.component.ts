import {Component, OnInit} from '@angular/core';
import {ApiService} from '../service/api.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    products: any = [];
    productName: string = "";
    totalElements: number = 0;

    // @ts-ignore
    constructor(
        public apiService: ApiService
    ) {
    }

    private getProducts(request: any){
        this.apiService.getSearchAdvancedProducts(request).subscribe(
            (data: {}) => {
                //convert list to array if not yet
                let resp = Array.isArray(data) ? data : [data]
                console.log("data")
                console.log({resp})
                this.products = resp;
                this.totalElements = resp.length;
            }, (err) => {
                this.products = [];
                this.totalElements = 0;
            });
    }

    ngOnInit(): void {
        this.getProducts({name: this.productName, categ: "",  offset: 0, limit: 10});
    }

    nextPage(event: PageEvent) {
        const request: any = {};
        request['name'] = this.productName;
        request['categ'] = "";
        request['offset'] = event.pageIndex.toString();
        request['limit'] = event.pageSize.toString();
        this.getProducts(request);
    }
    _search(event: any): void {

        if (event) event.preventDefault();
        this.getProducts({name: this.productName, categ: "", offset: 0, limit: 20});

    }

}
