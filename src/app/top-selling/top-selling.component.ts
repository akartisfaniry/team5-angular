import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html',
  styleUrls: ['./top-selling.component.scss']
})
export class TopSellingComponent implements OnInit {
  products: any = [];
  constructor(
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getTopSelling().subscribe((data: {}) => {
      this.products = data;
    });
  }

}
