import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, from, lastValueFrom, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return from(this.handleAccess(request, next));
  }

  
  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    // Only add access token for secured endpoints
    const securedEndpoints = [  `${environment.fleurShopAPIUrl}/orders`, 
                                `${environment.fleurShopAPIUrl}/order-items`];

    // Check if the endpoints that we are requesting include those in the list
    if (securedEndpoints.some(url => request.urlWithParams.includes(url))){
        var accessToken!: string;
        // Get the access token from Okta
        this.auth.getAccessTokenSilently().subscribe(
            (data) => accessToken = data
        )
        //let testToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpOX3RZUmdEMUI4VHNTVXpVaFFiUyJ9.eyJpc3MiOiJodHRwczovL2Rldi1vN2N5dmI4MWZqcGN6ZzE1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiIzZ0NGSWRKdGRTQWd2ZXpyUUJ1aWNCVGlYQnNkZXZMOUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9mbGV1ci9hcGkiLCJpYXQiOjE3MDUyNzQ4MDUsImV4cCI6MTcwNTM2MTIwNSwiYXpwIjoiM2dDRklkSnRkU0FndmV6clFCdWljQlRpWEJzZGV2TDkiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.NTReQPIw66rQhq0wUe0rhe63H_6dO1Mrb0e9NIjnGd_oQRJPpFqAcz4R1mbipaE_HXfSlBYc6LrvSQOwJ6ntAppHJwZ0-DLPstHrTjxJavaywxm3PAd2VouX7X26SW-rNQkzcJYnSfwGMbVVNLpxFSt2yp-aeIk3tHAV3oti9-D5HIJw5bkHNFQL_g-ToTKgINPVxFvzbIZBK-ThEm8__JPRgBCbxx3ZLZ76qSh1JnI7rWFqUEcKq6zaXd_6WuFaxdnFG6Wwqp0rYuPCZxgtIvS9cNBQTx75eSOSWx8HDaY9QEYxo4DbrMc8bRBRvj0yhEODr3yoGJ5UxYRCt_Vivg";
        console.log(accessToken);
        request = request.clone({
            setHeaders: { Authorization: `Bearer ${accessToken}` }
        })
    }

    return await lastValueFrom(next.handle(request));
  }

}
