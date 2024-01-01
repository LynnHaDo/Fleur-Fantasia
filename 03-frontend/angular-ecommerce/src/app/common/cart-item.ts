import { Product } from "./product";

export class CartItem {
    id: number;
    name: string;
    unitPrice: number;
    imageUrl: string;
    quantity: number;
    
    constructor(theProduct: Product){
        this.id = theProduct.id,
        this.name = theProduct.name,
        this.unitPrice = theProduct.unitPrice,
        this.imageUrl = theProduct.imageUrl,
        this.quantity = 1
    }
}
