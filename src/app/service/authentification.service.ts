import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService, LoginResponse } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

/*  private isLogged = new BehaviorSubject(false);
  isLoggedNow = this.isLogged.asObservable();*/

  constructor(
      private apiService: ApiService
  ) { }

  async authenticate(username: string, password: string): Promise<LoginResponse | null>
  {
    let loginResponse = await this.apiService.doLogin(username,password);
    console.log("retour login", loginResponse);
    if (loginResponse!=null && loginResponse.access_token!=null){
      console.log("authenticate successfull");

      return loginResponse;
    }
    return null;
  }

  isLoggedIn(){
    let token = sessionStorage.getItem('access_token');
    return (token != null);
  }

  logout(){
    //delete session
    sessionStorage.removeItem('access_token');

    //maj observable status user connected
    //this.isLogged.next(false);
  }
}
