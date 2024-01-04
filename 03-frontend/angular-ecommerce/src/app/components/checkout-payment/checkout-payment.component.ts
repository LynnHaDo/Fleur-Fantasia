import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.css'
})
export class CheckoutPaymentComponent implements OnInit {
    firstName!: string | null;
    lastName!: string | null;
    email!: string | null;
    phoneNumber!: string | null;

    streetShipping!: string | null;
    cityShipping!: string | null;
    stateShipping!: string | null;
    countryShipping!: string | null;
    zipcodeShipping!: string | null;

    streetBilling!: string | null;
    cityBilling!: string | null;
    stateBilling!: string | null;
    countryBilling!: string | null;
    zipcodeBilling!: string | null;

    paymentFormGroup: FormGroup = this.formBuilder.group({
        cardType: '',
        nameOnCard: '',
        cardNumber: '',
        securityCode: '',
        expirationMonth: '',
        experatonYear: ''
    })

    months: number[];

    ngOnInit(): void {
        this.firstName = this.checkoutService.checkoutFormGroup.get('information')!.value.firstName;
        this.lastName = this.checkoutService.checkoutFormGroup.get('information')!.value.lastName;
        this.email = this.checkoutService.checkoutFormGroup.get('information')!.value.email;
        this.phoneNumber = this.checkoutService.checkoutFormGroup.get('information')!.value.phoneNumber;

        this.streetShipping = this.checkoutService.checkoutFormGroup.get('shippingAddress')!.value.street;
        this.cityShipping = this.checkoutService.checkoutFormGroup.get('shippingAddress')!.value.city;
        this.stateShipping = this.checkoutService.checkoutFormGroup.get('shippingAddress')!.value.state;
        this.countryShipping = this.checkoutService.checkoutFormGroup.get('shippingAddress')!.value.country;
        this.zipcodeShipping = this.checkoutService.checkoutFormGroup.get('shippingAddress')!.value.zipcode;

        this.streetBilling = this.checkoutService.checkoutFormGroup.get('billingAddress')!.value.street;
        this.cityBilling = this.checkoutService.checkoutFormGroup.get('billingAddress')!.value.city;
        this.stateBilling = this.checkoutService.checkoutFormGroup.get('billingAddress')!.value.state;
        this.countryBilling = this.checkoutService.checkoutFormGroup.get('billingAddress')!.value.country;
        this.zipcodeBilling = this.checkoutService.checkoutFormGroup.get('billingAddress')!.value.zipcode;
    }

    constructor(private checkoutService: CheckoutService,
                private formBuilder: FormBuilder){
                    this.months = Array(12).fill(1).map((x,i)=>i+1);
                }
    
    onSubmit(){
        this.checkoutService.checkoutFormGroup.controls.payment!.setValue(this.paymentFormGroup.value);
        console.log(this.checkoutService.checkoutFormGroup.value)
    }

    backToDelivery(){
        this.checkoutService.startCheckout.next(false);
        this.checkoutService.startDelivery.next(true);
        this.checkoutService.startPayment.next(false);
    }
}
