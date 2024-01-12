import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/common/address';
import { Customer } from 'src/app/common/customer';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { PaymentInfo } from 'src/app/common/payment-info';
import { Purchase } from 'src/app/common/purchase';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FleurValidators } from 'src/app/validators/fleur-validators';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.css',
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() numItems: number = 0;
  @Input() total: number = 0;

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

  stripe = Stripe(environment.stripePublisableKey);
  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = '';
  paymentStatus: any = '';

  paymentFormGroup: FormGroup = this.formBuilder.group({
    cardType: new FormControl('', Validators.required),
    nameOnCard: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      FleurValidators.checkWhitespace,
    ]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{16}'),
    ]),
    securityCode: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{3}'),
    ]),
    expirationMonth: new FormControl('', Validators.required),
    expirationYear: new FormControl('', Validators.required),
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

    this.streetShipping =
      this.checkoutService.checkoutFormGroup.get(
        'shippingAddress'
      )!.value.street;
    this.cityShipping =
      this.checkoutService.checkoutFormGroup.get('shippingAddress')!.value.city;
    this.stateShipping =
      this.checkoutService.checkoutFormGroup.get(
        'shippingAddress'
      )!.value.state;
    this.countryShipping =
      this.checkoutService.checkoutFormGroup.get(
        'shippingAddress'
      )!.value.country;
    this.zipcodeShipping =
      this.checkoutService.checkoutFormGroup.get(
        'shippingAddress'
      )!.value.zipcode;

    this.streetBilling =
      this.checkoutService.checkoutFormGroup.get(
        'billingAddress'
      )!.value.street;
    this.cityBilling =
      this.checkoutService.checkoutFormGroup.get('billingAddress')!.value.city;
    this.stateBilling =
      this.checkoutService.checkoutFormGroup.get('billingAddress')!.value.state;
    this.countryBilling =
      this.checkoutService.checkoutFormGroup.get(
        'billingAddress'
      )!.value.country;
    this.zipcodeBilling =
      this.checkoutService.checkoutFormGroup.get(
        'billingAddress'
      )!.value.zipcode;

    this.setupStripePaymentForm();
  }

  constructor(
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService
  ) {}

  // Getters
  get cardType() {
    return this.paymentFormGroup.get('cardType')!;
  }
  get nameOnCard() {
    return this.paymentFormGroup.get('nameOnCard')!;
  }
  get cardNumber() {
    return this.paymentFormGroup.get('cardNumber')!;
  }
  get securityCode() {
    return this.paymentFormGroup.get('securityCode')!;
  }
  get expirationMonth() {
    return this.paymentFormGroup.get('expirationMonth')!;
  }
  get expirationYear() {
    return this.paymentFormGroup.get('expirationYear')!;
  }

  onSubmit() {
    let thePurchase = this.generatePurchase();

    // Compute payment info
    this.paymentInfo.amount = Math.round(this.total * 100);
    this.paymentInfo.currency = "USD";
    this.paymentInfo.email = thePurchase.customer.email;

    // Call Spring REST API to create payment intent
    this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe(
        (paymentIntentResponse) => {
            // Send the payment info to Stripe server
            this.stripe.confirmCardPayment(paymentIntentResponse.client_secret, {
                payment_method: {
                    card: this.cardElement,
                    billing_details: {
                        email: thePurchase.customer.email,
                        name: `${thePurchase.customer.firstName} ${thePurchase.customer.lastName}`,
                        address: {
                            line1: thePurchase.billingAddress.street,
                            city: thePurchase.billingAddress.city,
                            state: thePurchase.billingAddress.state,
                            postal_code: thePurchase.billingAddress.zipcode,
                            country: thePurchase.billingAddress.country
                        }
                    }
                }
            }, {handleActions: false})
            .then((result: any) => {
                if (result.error){
                    // Inform user of the error
                    this.paymentStatus.textContent = result.error.message;
                } else {
                    this.saveOrder(thePurchase);
                    this.resetCheckoutStatus();
                    this.resetCart();
                }
            })
        }
    )
  }

  resetCheckoutStatus() {
    this.checkoutService.startCheckout.next(true);
    this.checkoutService.startDelivery.next(false);
    this.checkoutService.startPayment.next(false);
  }

  resetCart() {
    // Reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.persistCartItems();

    // Reset the form
    this.checkoutService.checkoutFormGroup.reset();
    this.paymentFormGroup.reset();

    // Navigate back to home page
    this.router.navigateByUrl('/products');
  }
  generatePurchase(): Purchase {
    // Generate a purchase
    let order = new Order();

    order.totalPrice = Math.round(this.total * 100);
    order.totalQuantity = this.numItems;

    // Get cart items and convert them into order items
    const cartItems = this.cartService.cartItems;
    let orderItems: OrderItem[] = cartItems.map((item) => new OrderItem(item));

    // Set up purchase
    let purchase = new Purchase();
    purchase.customer = new Customer();
    purchase.customer.firstName = this.firstName!;
    purchase.customer.lastName = this.lastName!;
    purchase.customer.email = this.email!;
    purchase.customer.phoneNumber = this.phoneNumber!;

    purchase.shippingAddress = new Address();
    purchase.shippingAddress.street = this.streetShipping!;
    purchase.shippingAddress.country = this.countryShipping!;
    purchase.shippingAddress.state = this.stateShipping!;
    purchase.shippingAddress.city = this.cityShipping!;
    purchase.shippingAddress.zipcode = this.zipcodeShipping!;

    purchase.billingAddress = new Address();
    purchase.billingAddress.street = this.streetBilling!;
    purchase.billingAddress.country = this.countryBilling!;
    purchase.billingAddress.state = this.stateBilling!;
    purchase.billingAddress.city = this.cityBilling!;
    purchase.billingAddress.zipcode = this.zipcodeBilling!;

    // Save the order to the purchase
    purchase.order = order;
    purchase.orderItems = orderItems;

    return purchase;
  }

  saveOrder(purchase: Purchase){
    // Call REST API to save the order
    this.checkoutService.placeOrder(purchase).subscribe({
        // Handling success submission
        next: (response) => {
          alert(
            `Your order has been received. Order tracking number: ${response.orderTrackingNumber}`
          );
          // reset cart
          this.resetCart();
        },
        // Handling failure submission
        error: (error) => {
          alert(`There was an error: ${error.message}`);
        },
      });
  }

  setupStripePaymentForm() {
    this.paymentStatus = document.getElementById("payment-status");

    // Get all stripe elements
    var elements = this.stripe.elements();

    // Create a card element and hide the zipcode field
    this.cardElement = elements.create('card', { 
        hidePostalCode: true
    });

    // Add an instance of card UI component to the 'card-element' div
    this.cardElement.mount('#card-element');

    // Add event for the "change" event on the card element
    this.cardElement.on('change', (event: any) => {
      // Get the card-errors div
      this.displayError = document.getElementById('card-errors');

      if (event.complete) {
        this.displayError.textContent = '';
      } else if (event.error) {
        this.displayError.textContent = `${event.error.message}`;
      }
    });
  }

  backToDelivery() {
    this.checkoutService.startCheckout.next(false);
    this.checkoutService.startDelivery.next(true);
    this.checkoutService.startPayment.next(false);
  }
}
