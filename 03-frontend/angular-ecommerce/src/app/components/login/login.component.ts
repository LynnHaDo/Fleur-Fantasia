import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import fleurConfig from 'src/app/config/fleur-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    
    oktaSignin: any;

    constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth){
        this.oktaSignin = new OktaSignIn({
            logo: 'assets/images/fleur-icon.png',
            baseUrl: fleurConfig.oidc.issuer.split('/oauth2')[0],
            clientId: fleurConfig.oidc.clientId,
            redirectUri: fleurConfig.oidc.redirectUri,
            authParams: {
                pkce: true,
                issuer: fleurConfig.oidc.issuer,
                scopes: fleurConfig.oidc.scopes
            }
        });
    }

    ngOnInit(): void {
        this.oktaSignin.remove();
        this.oktaSignin.renderEl({
            el: '#okta-sign-in-widget'},
            (response: any) => {
                if (response.status === "SUCCESS"){
                    this.oktaAuth.signInWithRedirect();
                }
            },
            (error: any) => {
                throw error;
            }
        )
    }
}
