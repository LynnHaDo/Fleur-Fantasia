import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.css'
})
export class CheckoutDeliveryComponent implements OnInit {
    firstName!: string | null;
    lastName!: string | null;
    email!: string | null;
    phoneNumber!: string | null;

    shippingFormGroup: FormGroup = this.formBuilder.group({
        shipping: this.formBuilder.group({
            street: [''],
            city: [''],
            state: [''],
            country: [''],
            zipcode: ['']
        }),
        billing: this.formBuilder.group({
            street: [''],
            city: [''],
            state: [''],
            country: [''],
            zipcode: ['']
        })
    })

    ngOnInit(): void {
        this.firstName = this.checkoutService.checkoutFormGroup.get('information')!.value.firstName;
        this.lastName = this.checkoutService.checkoutFormGroup.get('information')!.value.lastName;
        this.email = this.checkoutService.checkoutFormGroup.get('information')!.value.email;
        this.phoneNumber = this.checkoutService.checkoutFormGroup.get('information')!.value.phoneNumber;
    }

    constructor(private checkoutService: CheckoutService,
                private formBuilder: FormBuilder){}
    
    copyShippingtoBilling(event: any){
        if (event.target.checked){
            this.shippingFormGroup.controls['billing'].setValue(this.shippingFormGroup.controls['shipping'].value)
        } else {
            this.shippingFormGroup.controls['billing'].reset();
        }
    }
    
    onSubmit(){
        this.checkoutService.startCheckout.next(false);
        this.checkoutService.startDelivery.next(false);
        this.checkoutService.startPayment.next(true);
        // Set the values for shipping address
        this.checkoutService.checkoutFormGroup.controls.shippingAddress!.setValue(this.shippingFormGroup.controls['shipping'].value)

        // Set the values for billing address
        this.checkoutService.checkoutFormGroup.controls.billingAddress!.setValue(this.shippingFormGroup.controls['billing'].value)

        console.log(this.checkoutService.checkoutFormGroup.value);
    }

    backToInfo(){
        this.checkoutService.startCheckout.next(true);
        this.checkoutService.startDelivery.next(false);
        this.checkoutService.startPayment.next(false);
    }
}
