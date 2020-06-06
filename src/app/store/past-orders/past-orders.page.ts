import { Component } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { StoreOrder } from '../models/store.model';

@Component({
    templateUrl: './past-orders.page.html',
    styleUrls: ['./past-orders.page.scss']
})
export class PastOrdersPage {
    pastOrders = [];
    constructor(private _dashboardService: DashboardService) {
        this.getPastOrders();
    }

    private getPastOrders() {
        this._dashboardService.getPastOrders().subscribe((res: StoreOrder[]) => {
            this.pastOrders = res;
            console.log('past resss ', res);
        });
    }
}
