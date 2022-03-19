import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(
      private apiService: ApiService
  ) { }

  async authenticate(username: string, password: string){
    let loginResponse = await this.apiService.doLogin(username,password);
    console.log("retour login", loginResponse);
    if (loginResponse!=null && loginResponse.access_token!=null){
      console.log("authenticate successfull");
      sessionStorage.setItem("access_token", loginResponse.access_token);
      return true;
    }
    return false;
  }

  isLoggedIn(){
    let token = sessionStorage.getItem('access_token');
    return (token != null);
  }

  logout(){
    sessionStorage.removeItem('access_token');
  }
}
