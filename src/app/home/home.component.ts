import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../service/authentification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
      private authService: AuthentificationService,
      private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()){
      this.router.navigate(['login'])
    }
  }

}
