import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService, ResultSearchProduct} from '../service/api.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { Categorie } from '../entity/Categorie';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    products: any = [];
    productName: string = "";
    categories: any = [];
    productCategorie: any = "";
    totalElements: number = 0;
    pageSizeOptions: any = [3, 6, 9, 12];
    default_PageSize: number = 9;

    @ViewChild(MatPaginator, {static: false}) paginator: any;

    // @ts-ignore
    constructor(
        public apiService: ApiService
    ) {
    }

    private getProducts(request: any) {
        this.apiService.getSearchAdvancedProducts(request).subscribe(
            (data: ResultSearchProduct) => {
                //convert list to array if not yet
                /*let resp = Array.isArray(data) ? data : [data]
                console.log("data")
                console.log({resp})*/
                this.products = data.produits;
                this.totalElements = data.total;
            }, (err) => {
                this.products = [];
                this.totalElements = 0;
            });
    }

    ngOnInit(): void {
        //Recuperer liste catégories
        this.apiService.getCategories().subscribe(
            (data: Categorie[]) => {
                console.log({data})
                //[{key: "tous",value: ""},{key: "pantalon",value: "pantalon"}, {key: "tShirt",value: "tShirt"}];
                this.categories.push({key: "tous", value: ""})
                for (const item of data){
                    this.categories.push({key: item.libelle, value: item.id})
                }
                this.productCategorie = this.categories[0].value
            }, (err) => {
                this.categories = [];
            });

        //Récuperer liste produits initale
        this.getProducts({
            name: this.productName,
            categ: this.productCategorie,
            offset: 0,
            limit: this.default_PageSize
        });
    }

    nextPage(event: PageEvent) {
        const pageIndex: number = Number(event.pageIndex.toString());
        const pageSize: number = Number(event.pageSize.toString());
        this.getProducts({
            name: this.productName,
            categ: this.productCategorie,
            offset: pageIndex * pageSize,
            limit: pageSize
        });
    }

    _search(event: any): void {

        if (event) event.preventDefault();

        //Reinitialiser paramètre de pagination
        if (this.paginator){
            this.paginator.pageIndex = 0;
            this.paginator.pageSize = this.default_PageSize;
        }

        //Rechercher produit
        this.getProducts({
            name: this.productName,
            categ: this.productCategorie,
            offset: 0,
            limit: this.default_PageSize
        });

    }

}
