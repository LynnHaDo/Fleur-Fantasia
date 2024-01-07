import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent implements OnInit {
    isAuthenticated: boolean = false;
    userFullName: string = '';

    constructor(private oktaAuthService: OktaAuthStateService, 
        @Inject(OKTA_AUTH) private oktaAuth: OktaAuth){}

    ngOnInit(): void {
        // Subscribe to authentication state changes
        this.oktaAuthService.authState$.subscribe(
            (result) => {
                this.isAuthenticated = result.isAuthenticated!;
                this.getUserDetails();
            }
        )
    }

    getUserDetails(){
        // If user has been authenticated
        if (this.isAuthenticated){
            // Fetch all the logged in user's claims
            this.oktaAuth.getUser().then(
                (res) => {
                    this.userFullName = res.name as string;
                }
            )
        }
    }

    logOut(){
        this.oktaAuth.signOut(); // terminate the session
    }
}
