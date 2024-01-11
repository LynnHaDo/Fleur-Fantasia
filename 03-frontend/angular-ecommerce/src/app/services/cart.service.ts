import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject } from 'rxjs';

const spendingThreshold = 100;
const standardShippingFee = 14;
const taxPercent = 0.03;

@Injectable({
  providedIn: 'root'
})
export class CartService {
    // Properties
    cartItems: CartItem[] = [];
    totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    shippingPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    taxPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    grandPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    // Storage
    storage: Storage = sessionStorage;

    constructor() {
        let data = this.storage.getItem('cartItems');
        if (data != null){
            this.cartItems = JSON.parse(data);
            this.calculateCartTotal();
        } 
    }

    // Methods
    addToCart(theCartItem: CartItem, theQuantity: number){
        let isItemInList: boolean = false;

        // Check first if the item already exists in the list
        if (this.cartItems.length > 0){
            for (let item of this.cartItems){
                if (theCartItem.id === item.id){
                    isItemInList = true;
                    item.quantity += theQuantity; // update quantity
                }
            }
        }

        if (!isItemInList){
            this.cartItems.push(theCartItem);
        }

        this.calculateCartTotal();
    }

    calculateCartTotal(){
        let totalPriceVal: number = 0;
        let totalQuantityVal: number = 0;

        for (let item of this.cartItems){
            totalPriceVal += item.quantity * item.unitPrice;
            totalQuantityVal += item.quantity;
        }

        // Free shipping on orders above the spending threshold
        let shippingPriceVal = totalPriceVal >= spendingThreshold? 0:standardShippingFee;
        this.shippingPrice.next(shippingPriceVal);

        // Calculate tax
        this.taxPrice.next(totalPriceVal * taxPercent);

        // Update the total price and quantity values for all subscribers
        this.totalPrice.next(totalPriceVal);
        this.totalQuantity.next(totalQuantityVal);
        this.grandPrice.next(totalPriceVal * (1 + taxPercent) + shippingPriceVal);
        //this.logCartData(totalPriceVal, totalQuantityVal);
        this.persistCartItems();
    }

    logCartData(price: number, quantity: number){
        for (let item of this.cartItems){
            console.log("Item: " + item.name + " , Quantity: " + item.quantity + ", Price: " + item.unitPrice);
        }
        console.log("Total price: " + price);
        console.log("Total quantity: " + quantity);
    }

    persistCartItems(){
        this.storage.setItem('cartItems', JSON.stringify(this.cartItems))
    }
}
