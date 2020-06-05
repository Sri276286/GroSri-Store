import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './dashboard/dashboard.page';
import { OrdersPage } from './orders/orders.page';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        DashboardPage,
        OrdersPage
    ]
})
export class StoreModule {

}