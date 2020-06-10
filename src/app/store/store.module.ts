import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './dashboard/dashboard.page';
import { OrdersPage } from './orders/orders.page';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignupPage } from './signup/signup.page';
import { LoginPage } from './login/login.page';
import { ProductModalPage } from './orders/product/product.page';
import { PastOrdersPage } from './past-orders/past-orders.page';
import { MenuPage } from './menu/menu.page';
import { BusinessPage } from './business/business.page';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        DashboardPage,
        OrdersPage,
        LoginPage,
        SignupPage,
        ProductModalPage,
        PastOrdersPage,
        MenuPage,
        BusinessPage
    ]
})
export class StoreModule {

}