import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    placedOrders = [];
    pastOrders = [];

    constructor(private _modalCtrl: ModalController) {

    }

    getOrderedProductsById(id: string) {
        console.log('placed orders ', this.placedOrders);
        const item = this.placedOrders.find(t => t.id === +id);
        if (item && item.orderProducts) {
            return item.orderProducts;
        }
        return [];
    }

    /**
     * Check if logged in
     */
    public isLogin() {
        const auth_token = localStorage.getItem('auth_token');
        const session_active = localStorage.getItem('session_active');
        return auth_token && session_active ? true : false;
    }

    /**
     * Get store id
     */
    public getStoreId() {
        const store_id = localStorage.getItem('storeId');
        return store_id ? store_id : '';
    }

    async presentModal(component, properties?: any, cssClass?: string) {
        const modal = await this._modalCtrl.create({
            component: component,
            cssClass: cssClass,
            componentProps: properties
        });
        return await modal.present();
    }
}
