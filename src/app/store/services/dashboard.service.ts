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
        const storeId = this._commonService.getStoreId();
        return this._httpClient.get<OrderResponse>(`${ApiConfig.storeDashboardURL}/${storeId}`)
            .pipe(map((res: OrderResponse) => {
                if (res && res.orders && res.orders.length) {
                    const orders = this.mapCurrentOrders(res.orders);
                    const sort_orders = this.sortOrdersById(orders);
                    console.log('orders ', orders);
                    this._commonService.placedOrders = sort_orders;
                    return sort_orders;
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
                    const sort_orders = this.sortOrdersById(orders);
                    this._commonService.pastOrders = sort_orders;
                    return sort_orders;
                } else {
                    return [];
                }
            }));
    }

    getOrderById(id: string) {
        return this._httpClient.get(`${ApiConfig.orderDetailsURL}/${id}`);
    }

    /**
     * Update Order Status
     */
    updateOrderStatus(orderId: string, status: string, reject?: boolean) {
        const updatedStatus = this.statusUpdateMapping(status, reject);
        return this._httpClient.put(`${ApiConfig.orderStatusURL}/${orderId}/orderStatus/${updatedStatus}`, null);
    }

    private mapCurrentOrders(orders: StoreOrder[]) {
        return orders.filter(order => {
            order.orderStatus = this.statusMapping(order);
            return (order.orderStatus.toLowerCase() !== 'delivered'
                && order.orderStatus.toLowerCase() !== 'rejected'
                && order.orderStatus.toLowerCase() !== 'rejected by customer');
        });
    }

    private sortOrdersById(orders: StoreOrder[]) {
        return orders.sort((a, b) => {
            return b.id > a.id ? 1 : -1;
        });
    }

    private mapPastOrders(orders: StoreOrder[]) {
        return orders.filter(order => (order.orderStatus.toLowerCase() === 'delivered'
            || order.orderStatus.toLowerCase() === 'customer_cancelled'
            || order.orderStatus.toLowerCase() === 'store_cancelled'));
    }

    private statusMapping(order) {
        let newStatus = '';
        switch (order.orderStatus) {
            case 'PLACED':
                newStatus = 'NEW';
                break;
            case 'ACCEPTED':
                newStatus = 'ACCEPTED';
                break;
            case 'CUSTOMER_CANCELLED':
                newStatus = 'REJECTED BY CUSTOMER';
                break;
            case 'STORE_CANCELLED':
                newStatus = 'REJECTED';
                break;
            case 'PREPARE':
                newStatus = 'PREPARING';
                break;
            case 'READY':
                newStatus = 'READY TO PICKUP';
                break;
            case 'DELIVERED':
                newStatus = 'DELIVERED';
                break;
            default:
            // nothing
        }
        return newStatus;
    }

    /**
     * UI status mapping with server status
     * @param currentStatus
     * @param reject
     */
    private statusUpdateMapping(currentStatus: string, reject?: boolean) {
        console.log('current status ', currentStatus);
        let updatedStatus = '';
        switch (currentStatus) {
            case 'NEW':
                // handle reject
                if (reject)
                    updatedStatus = 'STORE_CANCELLED';
                else
                    updatedStatus = 'ACCEPTED';
                break;
            case 'ACCEPTED':
                updatedStatus = 'PREPARE';
                break;
            case 'PREPARING':
                updatedStatus = 'READY';
                break;
            case 'READY TO PICKUP':
                updatedStatus = 'DELIVERED';
                break;
            default:
            // nothing
        }
        console.log('updated status ', updatedStatus);
        return updatedStatus;
    }
}
