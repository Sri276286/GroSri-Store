import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfig } from '../config/api.config';
import { CommonService } from './common.service';
import { OrderResponse, StoreOrder } from '../models/store.model';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private _httpClient: HttpClient,
        private _commonService: CommonService) {
    }

    /**
     * Get stores recent order and processed order list based on area or pincode
     * @param locationKey
     */
    getCurrentOrders() {
        return this._httpClient.get<OrderResponse>(ApiConfig.storeDashboardURL)
            .pipe(map((res: OrderResponse) => {
                if (res && res.orders && res.orders.length) {
                    return this.mapCurrentOrders(res.orders);
                } else {
                    return [];
                }
            }));
    }

    private mapCurrentOrders(orders: StoreOrder[]) {
        return orders.filter(order => order.orderStatus.toLowerCase() === 'placed');
    }
}
