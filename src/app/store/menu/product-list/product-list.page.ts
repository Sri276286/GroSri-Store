import { Component, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ItemWeightsPage } from '../item-weights/item-weights.page';
import { ItemModalPage } from '../item/item.page';
import { CommonService } from '../../services/common.service';
import { MenuService } from '../../services/menu.service';

@Component({
    selector: 'product-list',
    templateUrl: 'product-list.page.html',
    styleUrls: ['./product-list.page.scss']
})
export class ProductListPage {
    @Input('products') products;
    @Input() menuEdit = false;

    constructor(private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private _commonService: CommonService,
        private _menuService: MenuService) { }

    selectWeightsModal(item) {
        this.presentWeightsModal(item);
    }

    updateItem(item) {
        this._commonService.presentModal(ItemModalPage, {item});
    }

    deleteProduct(id) {
        this._menuService.deleteProduct(id).subscribe(() => {
            this._menuService.productHandleSuccess$.next(true);
        }, () => {
            // TODO show a toast
        });
    }


    /**
     * Show alert to delete product
     * @param item
     */
    deleteItemAlert(item) {
        this.presentAlert(item);
    }

    async presentAlert(item) {
        const alert = await this.alertCtrl.create({
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
                        this.deleteProduct(item.id);
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