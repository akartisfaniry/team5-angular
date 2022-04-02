import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from '../entity/product';
import { ApiService } from '../service/api.service';
import { AuthentificationService } from '../service/authentification.service';

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html',
  styleUrls: ['./top-selling.component.scss']
})
export class TopSellingComponent implements OnInit {
  products: any = [];
  constructor(
    public apiService: ApiService,
    private authService: AuthentificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()){
      this.apiService.getTopSelling().subscribe((data: {}) => {
        this.products = data;
      });
    }
  }

  async _addToBasket(product:Product) {
    let id = product.id;
    let nombre = product.nombre;
    let libelle = product.libelle;
    console.log(id)
    console.log(nombre)
    if (nombre!==undefined){
      let responseData = await this.apiService.addBasketForUserConnected(id, nombre);
      if (responseData!=null && responseData.status === 'success'){
        Swal.fire('Panier', nombre+' produit "'+libelle+'" ajouté avec succès', 'success');
      }
      else{
        Swal.fire('Panier', "Un erreur s'est produit!", 'error');
      }
    }
    else {
      Swal.fire('Veuillez selectionnez un quantité!');
    }
    
  }

}
