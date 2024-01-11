import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Observable, from, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    // Only add access token for secured endpoints
    const securedEndpoints = [  `${environment.fleurShopAPIUrl}/orders`, 
                                `${environment.fleurShopAPIUrl}/order-items`];

    // Check if the endpoints that we are requesting include those in the list
    if (securedEndpoints.some(url => request.urlWithParams.includes(url))){
        // Get the access token from Okta
        const accessToken = this.oktaAuth.getAccessToken();

        // Clone the request and add a new header with access token 
        request = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + accessToken
            }
        })
    }

    return await lastValueFrom(next.handle(request));

  }

}
