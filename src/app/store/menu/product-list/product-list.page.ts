import { Component, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ItemWeightsPage } from '../item-weights/item-weights.page';
import { ItemModalPage } from '../item/item.page';

@Component({
    selector: 'product-list',
    templateUrl: 'product-list.page.html',
    styleUrls: ['./product-list.page.scss']
})
export class ProductListPage {
    @Input('products') products;

    constructor(private modalCtrl: ModalController,
        private alertCtrl: AlertController) { }

    selectWeightsModal(item) {
        this.presentWeightsModal(item);
    }

    updateItem(item) {
        this.presentProductModal(item);
    }

    deleteItem(item) {
        this.presentAlert(item);
    }

    async presentProductModal(item?: any) {
        const modal = await this.modalCtrl.create({
            component: ItemModalPage,
            componentProps: {
                'item': item
            }
        });
        return await modal.present();
    }

    async presentAlert(item) {
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: `Remove ${item.productName}`,
            message: `Do you want to remove ${item.productName}?`,
            buttons: [
                {
                    text: 'No',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Yes',
                    handler: () => {
                        console.log('Confirm Okay');
                    }
                }
            ]
        });

        await alert.present();
    }

    async presentWeightsModal(item?: any) {
        const modal = await this.modalCtrl.create({
            component: ItemWeightsPage,
            cssClass: 'modal-grosri',
            componentProps: {
                'item': item
            }
        });
        return await modal.present();
    }
}