import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/common/address';
import { Customer } from 'src/app/common/customer';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FleurValidators } from 'src/app/validators/fleur-validators';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.css'
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

    months!: number[];
    years!: number[];
    passedMonths: number[] = [];

    paymentFormGroup: FormGroup = this.formBuilder.group({
        cardType: new FormControl('', Validators.required),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), FleurValidators.checkWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: new FormControl('', Validators.required),
        expirationYear: new FormControl('', Validators.required)
    })

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

        this.months = this.checkoutService.months;
        this.years = this.checkoutService.years;
    }

    constructor(private checkoutService: CheckoutService,
                private formBuilder: FormBuilder,
                private router: Router,
                private cartService: CartService){}
    
    // Getters
    get cardType(){return this.paymentFormGroup.get('cardType')!}
    get nameOnCard(){return this.paymentFormGroup.get('nameOnCard')!}
    get cardNumber(){return this.paymentFormGroup.get('cardNumber')!}
    get securityCode(){return this.paymentFormGroup.get('securityCode')!}
    get expirationMonth(){return this.paymentFormGroup.get('expirationMonth')!}
    get expirationYear(){return this.paymentFormGroup.get('expirationYear')!}

    onSubmit(){
        if (this.paymentFormGroup.invalid){
            this.paymentFormGroup.markAllAsTouched();
            return;
        } else {
            this.checkoutService.checkoutFormGroup.controls.payment!.setValue(this.paymentFormGroup.value);
            
            // Generate a purchase
            let order = new Order();
            
            order.totalPrice = this.total;
            order.totalQuantity = this.numItems;

            // Get cart items and convert them into order items
            const cartItems = this.cartService.cartItems;
            let orderItems: OrderItem[] = cartItems.map(item => new OrderItem(item));

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

            console.log(purchase);
            
            // Call REST API to save the order
            this.checkoutService.placeOrder(purchase).subscribe({
                // Handling success submission
                next: response => {
                    alert(`Your order has been received. Order tracking number: ${response.orderTrackingNumber}`);
                    // reset cart
                    this.resetCart();
                },
                // Handling failure submission
                error: error => {
                    alert(`There was an error: ${error.message}`)
                }
            });

            this.resetCheckoutStatus();
            this.resetCart();
        }
    }

    resetCheckoutStatus(){
        this.checkoutService.startCheckout.next(true);
        this.checkoutService.startDelivery.next(false);
        this.checkoutService.startPayment.next(false);
    }

    resetCart(){
        // Reset cart data
        this.cartService.cartItems = [];
        this.cartService.totalPrice.next(0);
        this.cartService.totalQuantity.next(0);

        // Reset the form
        this.checkoutService.checkoutFormGroup.reset();
        this.paymentFormGroup.reset();

        // Navigate back to home page
        this.router.navigateByUrl("/products")
    }

    backToDelivery(){
        this.checkoutService.startCheckout.next(false);
        this.checkoutService.startDelivery.next(true);
        this.checkoutService.startPayment.next(false);
    }

    disableMonth(month: number){
        return this.passedMonths.includes(month)
    }

    displayMonths(year: string){
        let yearNum = year.split(" ")[1];
        let currentDate: Date = new Date();
        if (parseInt(yearNum) === currentDate.getFullYear()){
            for (let i = 1; i < currentDate.getMonth(); i++){
                this.passedMonths.push(i);
            }
        }
    }
}

