import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  banners: any
  numbers: any
  constructor(
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getBanners()
      .subscribe(data => {
        this.banners = data
        this.numbers = Array(this.banners.length).fill(1).map((x,i)=>i+1);
      });
  }

}
