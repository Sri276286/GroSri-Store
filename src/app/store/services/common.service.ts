import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    placedOrders = [];

    getOrderedProductsById(id: string) {
        console.log('placed orders ', this.placedOrders);
        const item = this.placedOrders.find(t => t.id === +id);
        if (item && item.orderProducts) {
            return item.orderProducts;
        }
        return [];
    }
}
