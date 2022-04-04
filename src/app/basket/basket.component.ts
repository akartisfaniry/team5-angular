import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  baskets: any = []

  constructor(
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getBasketsForUserConnected()
      .subscribe(data => {
        this.baskets = data
      });
  }

  _deleteCommande(id:number){
    const currentComponent = this;
    Swal.fire({
      title: 'Êtes - vous sure?',
      text: 'Cette commande sera supprimée.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then(async function(result) {
      if (result.value) {
        let responseData = await currentComponent.apiService.removeBasket(id);
        if (responseData!=null && responseData.status === 'success'){
          Swal.fire('Panier','La commande a été supprimée', 'success');
          currentComponent.ngOnInit();
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log('Annuler');
      }
    });
  }

  _doCommande(id:number) {
    const currentComponent = this;
    Swal.fire({
      title: 'Voulez - vous vraiment commander ce produit ?',
      text: 'Nous serons informé de votre commande.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then(async function(result) {
      if (result.value) {
        let responseData = await currentComponent.apiService.validateBasket(id);
        if (responseData!=null && responseData.status === 'success'){
          Swal.fire('Panier','Demande envoyée avec succès', 'success');
          currentComponent.ngOnInit();
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log('Annuler');
      }
    });
  }

}
