import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout-info',
  templateUrl: './checkout-info.component.html',
  styleUrl: './checkout-info.component.css',
})
export class CheckoutInfoComponent implements OnInit {    
    infoFormGroup: FormGroup = this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
        phoneNumber: ['']
    });

  ngOnInit() {}

  constructor(  private checkoutService: CheckoutService,
                private formBuilder: FormBuilder) {}

  onSubmit() {
    this.checkoutService.startCheckout.next(false);
    this.checkoutService.startDelivery.next(true);
    this.checkoutService.startPayment.next(false);

    // Set the values for shipping address
    this.checkoutService.checkoutFormGroup.controls.information!.setValue(this.infoFormGroup.value)

    console.log(this.checkoutService.checkoutFormGroup.value);
  }
}
