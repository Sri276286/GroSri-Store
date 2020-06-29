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
import { ItemModalPage } from './menu/item/item.page';
import { ItemDialogPage } from './menu/item-dialog/item-dialog.page';
import { ItemWeightsPage } from './menu/item-weights/item-weights.page';
import { ProductSearchPage } from './menu/product-search/product-search.component';
import { ProductListPage } from './menu/product-list/product-list.page';
import { TabsPage } from './tabs/tabs.page';
import { ProfilePage } from './profile/profile.page';
import { UserModalPage } from './profile/user-modal/user-modal.page';
import { StoreValidatePage } from './store-validate/store-validate.page';
import { StoreRegisterPage } from './store-register/store-register.page';
import { StoreSettingsPage } from './profile/store-settings/store-settings.page';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        TabsPage,
        DashboardPage,
        OrdersPage,
        LoginPage,
        SignupPage,
        ProfilePage,
        ProductModalPage,
        PastOrdersPage,
        MenuPage,
        BusinessPage,
        ItemModalPage,
        ItemDialogPage,
        ItemWeightsPage,
        ProductSearchPage,
        ProductListPage,
        UserModalPage,
        StoreValidatePage,
        StoreRegisterPage,
        StoreSettingsPage
    ]
})
export class StoreModule {

}