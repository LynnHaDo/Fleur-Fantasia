import { OrderHistoryItem } from "./order-history-item";

export class OrderHistory {
    orderHistoryItems!: OrderHistoryItem[];
    constructor(
        public id: number,
        public orderTrackingNumber: String,
        public dateCreated: Date,
        public totalPrice: number,
        public totalQuantity: number
    ){}
}
