import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../service/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userConnected: any;

  constructor(
      private authService: AuthentificationService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  _logout(): void{
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
