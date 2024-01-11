import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable, map} from 'rxjs';
import { Country } from '../common/country';
import { HttpClient } from '@angular/common/http';
import { State } from '../common/state';
import { Purchase } from '../common/purchase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private countriesUrl = `${environment.fleurShopAPIUrl}/countries`;
  private statesUrl = `${environment.fleurShopAPIUrl}/states`;
  private purchaseUrl = `${environment.fleurShopAPIUrl}/checkout/purchase`;

  startCheckout: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  startPayment: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  startDelivery: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Form Group
  checkoutFormGroup = this.formBuilder.group({
    information: this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
    }),
    shippingAddress: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      country: [''],
      zipcode: [''],
    }),
    billingAddress: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      country: [''],
      zipcode: [''],
    }),
    payment: this.formBuilder.group({
      cardType: [''],
      nameOnCard: [''],
      cardNumber: [''],
      securityCode: [''],
      expirationMonth: [''],
      expirationYear: [''],
    }),
  });

  // Months
  months: number[];

  // Years
  years: number[];

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {
    this.months = Array(12)
      .fill(1)
      .map((x, i) => i + 1);
    let currentDate: Date = new Date();
    this.years = Array(10)
      .fill(currentDate.getFullYear())
      .map((x, i) => currentDate.getFullYear() + i);
  }

  placeOrder(purchase: Purchase): Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
        map(response => response._embedded.countries)
    )
  }

  getCountryById(theCountryId: number): Observable<Country>{
    const countryUrl: string = `${this.countriesUrl}/${theCountryId}`;
    return this.httpClient.get<Country>(countryUrl);
  }

  getStates(theCountryCode: string): Observable<State[]> {
    const statesInCountryUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<GetResponseStates>(statesInCountryUrl).pipe(
        map(response => response._embedded.states)
    )
  }
}

interface GetResponseCountries {
    _embedded:{
        countries: Country[]
    }
}

interface GetResponseStates {
    _embedded: {
        states: State[]
    }
}
