import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    // Properties
    cartItems: CartItem[] = [];
    totalPrice: Subject<number> = new Subject<number>();
    totalQuantity: Subject<number> = new Subject<number>();

    constructor() { }

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

        // Update the total price and quantity values for all subscribers
        this.totalPrice.next(totalPriceVal);
        this.totalQuantity.next(totalQuantityVal);
        this.logCartData(totalPriceVal, totalQuantityVal);
    }

    logCartData(price: number, quantity: number){
        for (let item of this.cartItems){
            console.log("Item: " + item.name + " , Quantity: " + item.quantity + ", Price: " + item.unitPrice);
        }
        console.log("Total price: " + price);
        console.log("Total quantity: " + quantity);
    }

}
