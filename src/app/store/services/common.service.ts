import { Injectable } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    placedOrders = [];
    pastOrders = [];
    getStoreId$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    constructor(private _modalCtrl: ModalController,
        private _loadingCtrl: LoadingController,
        private _toastCtrl: ToastController) {

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

    async presentToast(message: string, position?: "top" | "bottom" | "middle") {
        const toast = await this._toastCtrl.create({
          message: message,
          duration: 4000,
          position: position
        });
        toast.present();
      }

    async presentModal(component, properties?: any, cssClass?: string) {
        const modal = await this._modalCtrl.create({
            component: component,
            cssClass: cssClass,
            componentProps: properties
        });
        return await modal.present();
    }

    async presentLoading(message) {
        const loading = await this._loadingCtrl.create({
          message: message,
          duration: 1000,
          spinner: 'circles' // "bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines" | "lines-small"
        });
        await loading.present();
    
        const { role, data } = await loading.onDidDismiss();
        console.log('Loading dismissed!', data, role);
      }
}
