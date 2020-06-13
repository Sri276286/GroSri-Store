import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { OrderResponse, StoreOrder } from '../models/store.model';
import { ApiConfig } from 'src/app/config/api.config';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private _httpClient: HttpClient,
        private _commonService: CommonService) {
    }

    getCurrentOrders() {
        return this._httpClient.get<OrderResponse>(ApiConfig.storeDashboardURL)
            .pipe(map((res: OrderResponse) => {
                if (res && res.orders && res.orders.length) {
                    const orders = this.mapCurrentOrders(res.orders);
                    this._commonService.placedOrders = orders;
                    return orders;
                } else {
                    return [];
                }
            }));
    }

    getPastOrders() {
        return this._httpClient.get<OrderResponse>(ApiConfig.storeDashboardURL)
            .pipe(map((res: OrderResponse) => {
                if (res && res.orders && res.orders.length) {
                    const orders = this.mapPastOrders(res.orders);
                    this._commonService.pastOrders = orders;
                    return orders;
                } else {
                    return [];
                }
            }));
    }

    /**
     * Update Order Status
     */
    updateOrderStatus() {

    }

    private mapCurrentOrders(orders: StoreOrder[]) {
        return orders.filter(order => order.orderStatus.toLowerCase() === 'placed');
    }

    private mapPastOrders(orders: StoreOrder[]) {
        return orders.filter(order => order.orderStatus.toLowerCase() !== 'placed');
    }
}
