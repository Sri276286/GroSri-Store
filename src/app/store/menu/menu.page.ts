import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ItemModalPage } from './item/item.page';

@Component({
    templateUrl: 'menu.page.html',
    styleUrls: ['menu.page.scss']
})
export class MenuPage {
    products;
    showItems = false;

    constructor(private _menuService: MenuService,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController) {
        this._menuService.getMenu().subscribe((resp: any) => {
            console.log(resp);
            this.products = resp.productsByCategory;
        });
    }

    addItem() {
        this.presentModal();
    }

    updateItem(item) {

    }

    deleteItem(item) {
        this.presentAlert(item);
    }

    addItem1(type: string) {
        this.presentAlertPrompt();
    }

    async presentModal(item?: any) {
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

    async presentAlertPrompt() {
        const alert = await this.alertCtrl.create({
            header: 'Prompt!',
            inputs: [
                {
                    name: 'name2',
                    type: 'text',
                    id: 'name2-id',
                    value: 'hello',
                    placeholder: 'Placeholder 2'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: () => {
                        console.log('Confirm Ok');
                    }
                }
            ]
        });

        await alert.present();
    }


}