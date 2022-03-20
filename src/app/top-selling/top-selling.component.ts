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
  constructor(
    public apiService: ApiService,
    private authService: AuthentificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ngOnInit();
    this.apiService.getTopSelling().subscribe((data: {}) => {
      this.products = data;
    });

  }

}
