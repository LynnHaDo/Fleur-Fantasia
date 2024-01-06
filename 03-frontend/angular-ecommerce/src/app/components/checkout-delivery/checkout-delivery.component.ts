import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FleurValidators } from 'src/app/validators/fleur-validators';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.css',
})
export class CheckoutDeliveryComponent implements OnInit {
  firstName!: string | null;
  lastName!: string | null;
  email!: string | null;
  phoneNumber!: string | null;

  countries: Country[] = [];
  statesShipping: State[] = [];
  statesBilling: State[] = [];
  theShipping: string | null = '';

  shippingFormGroup: FormGroup = this.formBuilder.group({
    shipping: this.formBuilder.group({
      street: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        FleurValidators.checkWhitespace,
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        FleurValidators.checkWhitespace,
      ]),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      zipcode: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        FleurValidators.checkWhitespace,
      ]),
    }),
    billing: this.formBuilder.group({
      street: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        FleurValidators.checkWhitespace,
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        FleurValidators.checkWhitespace,
      ]),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      zipcode: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        FleurValidators.checkWhitespace,
      ]),
    }),
  });

  ngOnInit(): void {
    this.firstName =
      this.checkoutService.checkoutFormGroup.get(
        'information'
      )!.value.firstName;
    this.lastName =
      this.checkoutService.checkoutFormGroup.get('information')!.value.lastName;
    this.email =
      this.checkoutService.checkoutFormGroup.get('information')!.value.email;
    this.phoneNumber =
      this.checkoutService.checkoutFormGroup.get(
        'information'
      )!.value.phoneNumber;

    this.checkoutService
      .getCountries()
      .subscribe((data) => (this.countries = data));

    this.shippingFormGroup.setValue({
      shipping: {
        street:
          this.checkoutService.checkoutFormGroup.get('shippingAddress')!.value
            .street,
        city: this.checkoutService.checkoutFormGroup.get('shippingAddress')!
          .value.city,
        state:
          this.checkoutService.checkoutFormGroup.get('shippingAddress')!.value
            .state,
        country:
          this.checkoutService.checkoutFormGroup.get('shippingAddress')!.value
            .country,
        zipcode:
          this.checkoutService.checkoutFormGroup.get('shippingAddress')!.value
            .zipcode,
      },
      billing: {
        street:
          this.checkoutService.checkoutFormGroup.get('billingAddress')!.value
            .street,
        city: this.checkoutService.checkoutFormGroup.get('billingAddress')!
          .value.city,
        state:
          this.checkoutService.checkoutFormGroup.get('billingAddress')!.value
            .state,
        country:
          this.checkoutService.checkoutFormGroup.get('billingAddress')!.value
            .country,
        zipcode:
          this.checkoutService.checkoutFormGroup.get('billingAddress')!.value
            .zipcode,
      },
    });
  }

  constructor(
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder
  ) {}

  get shippingAddressStreet(){ return this.shippingFormGroup.get('shipping.street')!};
  get shippingAddressCity(){ return this.shippingFormGroup.get('shipping.city')!};
  get shippingAddressState(){ return this.shippingFormGroup.get('shipping.state')!};
  get shippingAddressCountry(){ return this.shippingFormGroup.get('shipping.country')!};
  get shippingAddressZipcode(){ return this.shippingFormGroup.get('shipping.zipcode')!};

  get billingAddressStreet(){ return this.shippingFormGroup.get('billing.street')!};
  get billingAddressCity(){ return this.shippingFormGroup.get('billing.city')!};
  get billingAddressState(){ return this.shippingFormGroup.get('billing.state')!};
  get billingAddressCountry(){ return this.shippingFormGroup.get('billing.country')!};
  get billingAddressZipcode(){ return this.shippingFormGroup.get('billing.zipcode')!};

  copyShippingtoBilling(event: any) {
    if (event.target.checked) {
      this.shippingFormGroup.controls['billing'].setValue(
        this.shippingFormGroup.controls['shipping'].value
      );
      this.statesBilling = this.statesShipping;
    } else {
      this.shippingFormGroup.controls['billing'].reset();
      this.statesBilling = [];
    }
  }

  onSubmit() {
    if (this.shippingFormGroup.invalid) {
        this.shippingFormGroup.markAllAsTouched();  
    } else {
        this.checkoutService.startCheckout.next(false);
        this.checkoutService.startDelivery.next(false);
        this.checkoutService.startPayment.next(true);
        // Set the values for shipping address
        this.checkoutService.checkoutFormGroup.controls.shippingAddress!.setValue(
          this.shippingFormGroup.controls['shipping'].value
        );
    
        // Set the values for billing address
        this.checkoutService.checkoutFormGroup.controls.billingAddress!.setValue(
          this.shippingFormGroup.controls['billing'].value
        );
    }
    console.log(this.checkoutService.checkoutFormGroup.value);
  }

  backToInfo() {
    this.checkoutService.startCheckout.next(true);
    this.checkoutService.startDelivery.next(false);
    this.checkoutService.startPayment.next(false);
  }

  handleCountryChange(
    theCountrySelect: HTMLSelectElement | null,
    addressType: string
  ) {
    if (theCountrySelect != null && theCountrySelect.value != "") {
      let countryCode = theCountrySelect.value.split(' ')[1];
      if (addressType == 'shipping') {
        this.checkoutService
          .getStates(countryCode)
          .subscribe((data) => (this.statesShipping = data));
      } else {
        this.checkoutService
          .getStates(countryCode)
          .subscribe((data) => (this.statesBilling = data));
      }
    }
  }
}
