import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { AuthentificationService } from '../service/authentification.service';

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html',
  styleUrls: ['./top-selling.component.scss']
})
export class TopSellingComponent implements OnInit {
  products: any = [];
  nombre: number = 1;
  constructor(
    public apiService: ApiService,
    private authService: AuthentificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiService.getTopSelling().subscribe((data: {}) => {
      this.products = data;
    });

  }

  async _addToBasket(id:number) {
    console.log(id)
    console.log(this.nombre)
    let responseData = await this.apiService.addBasketForUserConnected(id, this.nombre);
    console.log("response ", responseData)
    
  }

}
