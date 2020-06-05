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

    /**
     * Get stores recent order and processed order list based on area or pincode
     * @param locationKey
     */
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

    private mapCurrentOrders(orders: StoreOrder[]) {
        return orders.filter(order => order.orderStatus.toLowerCase() === 'placed');
    }
}
