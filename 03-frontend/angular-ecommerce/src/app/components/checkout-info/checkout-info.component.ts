import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FleurValidators } from 'src/app/validators/fleur-validators';

@Component({
  selector: 'app-checkout-info',
  templateUrl: './checkout-info.component.html',
  styleUrl: './checkout-info.component.css',
})
export class CheckoutInfoComponent implements OnInit {
  infoFormGroup: FormGroup = this.formBuilder.group({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      FleurValidators.checkWhitespace,
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      FleurValidators.checkWhitespace,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}'),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern("^[+](9[976]\\d|8[987530]\\d|6[987]\\d|5[90]\\d|42\\d|3[875]\\d|2[98654321]\\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\\W*\\d\\W*\\d\\W*\\d\\W*\\d\\W*\\d\\W*\\d\\W*\\d\\W*\\d\\W*(\\d{1,2})$")
    ]),
  });

  ngOnInit() {
    this.infoFormGroup.setValue({
      firstName:
        this.checkoutService.checkoutFormGroup.controls.information.value
          .firstName,
      lastName:
        this.checkoutService.checkoutFormGroup.controls.information.value
          .lastName,
      email:
        this.checkoutService.checkoutFormGroup.controls.information.value.email,
      phoneNumber:
        this.checkoutService.checkoutFormGroup.controls.information.value
          .phoneNumber,
    });
  }

  constructor(
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder
  ) {}

  // Getters
  get firstName() {
    return this.infoFormGroup.get('firstName')!;
  }
  get lastName() {
    return this.infoFormGroup.get('lastName')!;
  }
  get email() {
    return this.infoFormGroup.get('email')!;
  }
  get phoneNumber() {
    return this.infoFormGroup.get('phoneNumber')!;
  }

  isFirstnameValid(): boolean {
    console.log(this.infoFormGroup.controls['firstName'].invalid);
    return this.infoFormGroup.controls['firstName'].invalid;
  }

  onSubmit() {
    // Trigger error messages
    if (this.infoFormGroup.invalid) {
      this.infoFormGroup.markAllAsTouched();
    } else {
      // Set the values for shipping address
      this.checkoutService.checkoutFormGroup.controls.information!.setValue(
        this.infoFormGroup.value
      );
      this.checkoutService.startCheckout.next(false);
      this.checkoutService.startDelivery.next(true);
      this.checkoutService.startPayment.next(false);
    }
    console.log(this.checkoutService.checkoutFormGroup.value);
  }
}
