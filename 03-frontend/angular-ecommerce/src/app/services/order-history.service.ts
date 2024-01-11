import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { OrderHistory } from '../common/order-history';
import { Observable, map } from 'rxjs';
import { OrderHistoryItem } from '../common/order-history-item';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {
  orderHistoryItems!: OrderHistory[];
  ordersUrl: string = `${environment.fleurShopAPIUrl}/orders`;
  orderItemsUrl: string = `${environment.fleurShopAPIUrl}/order-items`;

  constructor(private httpClient: HttpClient) {}

  getOrderHistory(customerEmail: string): Observable<OrderHistory[]> {
    const ordersByEmailUrl: string = `${this.ordersUrl}/search/findByCustomerEmail?email=${customerEmail}`;
    return this.httpClient
      .get<GetResponseOrder>(ordersByEmailUrl)
      .pipe(map((response) => response._embedded.orders));
  }

  getOrderItemsByOrderId(id: number): Observable<OrderHistoryItem[]> {
    const orderIdUrl: string = `${this.orderItemsUrl}/search/findByOrderId?id=${id}`;
    return this.httpClient.get<GetResponseOrderItem>(orderIdUrl).pipe(map((response) => response._embedded.orderItems));
  }
}

interface GetResponseOrder {
  _embedded: {
    orders: OrderHistory[];
  };
}

interface GetResponseOrderItem {
    _embedded: {
        orderItems: OrderHistoryItem[]
    }
}
