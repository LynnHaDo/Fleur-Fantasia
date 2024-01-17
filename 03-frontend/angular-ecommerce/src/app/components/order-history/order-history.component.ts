import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {
    orderHistoryItems!: OrderHistory[];
    storage: Storage = sessionStorage;

    constructor(private orderHistoryService: OrderHistoryService){}

    ngOnInit(): void {
        let userEmail = this.storage.getItem('userEmail')!;
        this.displayOrderHistory(userEmail);
    }

    displayOrderHistory(theEmail: string){
        this.orderHistoryService.getOrderHistory(theEmail).subscribe(
            data => {
                this.orderHistoryItems = data;
                this.orderHistoryItems.sort((orderA, orderB) => {return new Date(orderB.dateCreated).getTime() - new Date(orderA.dateCreated).getTime()})
                this.orderHistoryItems.forEach((order) => this.retrieveItems(order))
            }
        )
    }

    retrieveItems(theOrder: OrderHistory){
        let orderId = theOrder.id;
        this.orderHistoryService.getOrderItemsByOrderId(orderId).subscribe(
            data => theOrder.orderHistoryItems = data
        )
    }

}
