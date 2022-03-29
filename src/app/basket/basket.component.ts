import { Component, OnInit } from '@angular/core';
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

}
