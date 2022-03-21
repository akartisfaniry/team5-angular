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

    // @ts-ignore
    constructor(
        public apiService: ApiService
    ) {
    }

    ngOnInit(): void {
       this._search();
    }

    _search(event: any = null): void {

        if (event)event.preventDefault();

        this.apiService.getProducts(this.productName, ['robe', 'pantalon']).subscribe(
            (data: {}) => {
                //convert list to array if not yet
                data = Array.isArray(data) ? data : [data]
                console.log("data")
                console.log({data})
                this.products = data;
            }, (err) => {
                this.products = []
            });
    }

}
