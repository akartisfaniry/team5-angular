import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../service/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFailed: boolean = false;
  message: any;
  username: any = "";
  userpass: any = "";

  constructor(
      private authService: AuthentificationService,
      private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()){
      this.router.navigate(['home'])
    }
  }

  async _login(event:any){

    event.preventDefault();

    this.loginFailed = false;
    if (await this.authService.authenticate(this.username, this.userpass)){
      console.log('login true')
      this.router.navigate(['home']).then(()=>{
        //refresh page pour mettre à jours l'app.component.html
        window.location.reload()
      })
    }else{
      console.log('login false')
      this.loginFailed = true;
      this.message = "Identifiants incorrects !"
    }


  }

}
