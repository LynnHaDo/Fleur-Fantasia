// Modules
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// Services
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { CheckoutService } from './services/checkout.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';

// Main app components
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

// Cart related components
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

// Checkout related components
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutInfoComponent } from './components/checkout-info/checkout-info.component';
import { CheckoutDeliveryComponent } from './components/checkout-delivery/checkout-delivery.component';
import { CheckoutPaymentComponent } from './components/checkout-payment/checkout-payment.component';

// Login related components
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { LoginComponent } from './components/login/login.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { MemberComponent } from './components/member/member.component';
import { OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG, OktaAuthGuard } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import fleurConfig from './config/fleur-config';
const oktaConfig = fleurConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

const routes: Routes = [
    {path: 'order-history', component: OrderHistoryComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage}},
    {path: 'member', component: MemberComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage}},
    {path: 'login/callback', component: OktaCallbackComponent},
    {path: 'login', component: LoginComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'cart', component: CartDetailsComponent},
    {path: 'products/:id', component: ProductDetailsComponent},
    {path: 'search/:keyword', component: ProductListComponent},
    {path: 'category/:id', component: ProductListComponent},
    {path: 'category', component: ProductListComponent},
    {path: 'products', component: ProductListComponent},
    {path: '', redirectTo: '/products', pathMatch: 'full'},
    {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    OrderSummaryComponent,
    CheckoutInfoComponent,
    CheckoutDeliveryComponent,
    CheckoutPaymentComponent,
    LoginComponent,
    LoginStatusComponent,
    MemberComponent,
    OrderHistoryComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers:[ProductService, CartService, CheckoutService, 
            {provide: OKTA_CONFIG, useValue: {oktaAuth}},
            {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
            ],
  bootstrap: [AppComponent]
})

export class AppModule { }

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector): void {
    // Access the router service
    const router = injector.get(Router);

    // Navigate to login page
    router.navigate(['/login']);
}

