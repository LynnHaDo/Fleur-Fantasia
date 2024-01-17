import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
/** 
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
*/
import { AuthService } from '@auth0/auth0-angular';
import fleurConfig from 'src/app/config/fleur-config';


@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent implements OnInit {
    isAuthenticated: boolean = false;
    userFullName: string = '';
    storage: Storage = sessionStorage;

    constructor(
        /** 
        private oktaAuthService: OktaAuthStateService, 
        @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
        */
       private auth: AuthService,
       @Inject(DOCUMENT) public document: Document){}

    ngOnInit(): void {       
       this.auth.isAuthenticated$.subscribe(
        (result) => {
            this.isAuthenticated = result;
            this.getUserDetails();
        }
       ) 
    }

    
    getUserDetails(){
        // If user has been authenticated
        this.auth.user$.subscribe((data) => {
            var email = data?.email!;
            this.storage.setItem("userEmail", email);
            this.userFullName = email.split("@")[0]
        });
    }
    

    logIn(){
        this.auth.loginWithRedirect({
            authorizationParams : {
                redirect_uri: fleurConfig.oidc.redirectUri,
                //audience: fleurConfig.oidc.apiUrl
            }
        });
        this.getUserDetails();
    }

    logOut(){
        this.auth.logout({ 
            logoutParams: {
              returnTo: fleurConfig.oidc.redirectUri
            }
        }); 
        this.storage.removeItem("userEmail");
    }
}
