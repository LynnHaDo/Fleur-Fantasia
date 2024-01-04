import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
    startCheckout: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    startPayment: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    startDelivery: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Form Group
  checkoutFormGroup = this.formBuilder.group({
    information: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
        phoneNumber: ['']
    }),
    shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
    }),
    billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
    }),
    payment: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        experatonYear: ['']
    })
    });

    constructor(private formBuilder: FormBuilder) { }
}
