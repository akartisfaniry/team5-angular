import {Component, OnInit} from '@angular/core';
import {ApiService} from '../service/api.service';

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

    ngOnInit(): void {
        this.getProducts({name: this.productName, categ: "",  offset: 0, limit: 20});
    }

    private getProducts(request: any){
        this.apiService.getSearchAdvancedProducts(request).subscribe(
            (data: {}) => {
                //convert list to array if not yet
                data = Array.isArray(data) ? data : [data]
                console.log("data")
                console.log({data})
                this.products = data;
            }, (err) => {
                this.products = [];
                this.totalElements = 0;
            });
    }
    _search(event: any): void {

        if (event) event.preventDefault();
        this.getProducts({name: this.productName, categ: "", offset: 0, limit: 20});

    }

}
