import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthentificationService} from './service/authentification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'lamba-project';

    isConnected: any;

    constructor(
        private authService: AuthentificationService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        console.log("init AppComponent ++++++++++++++++++++++++")

        //check si status utilisateur
        this.isConnected = this.authService.isLoggedIn()
        console.log("isconnected", this.isConnected)

        //redirection si utilisateur n'est pas authentifié
        if(!this.isConnected){
            this.router.navigate(['login'])
        }


    }
}
