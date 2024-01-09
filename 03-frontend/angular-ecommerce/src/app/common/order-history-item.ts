export class OrderHistoryItem {
    constructor(
        public id: number,
        public imageUrl: string,
        public unitPrice: number,
        public quantity: number,
        public productId: number
    ){}
}
