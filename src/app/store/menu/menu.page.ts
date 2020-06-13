import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ItemModalPage } from './item/item.page';
import { ItemDialogPage } from './item-dialog/item-dialog.page';
import { ItemWeightsPage } from './item-weights/item-weights.page';

@Component({
    templateUrl: 'menu.page.html',
    styleUrls: ['menu.page.scss']
})
export class MenuPage {
    products;
    showItems = false;
    canAddCategory = false;
    newCategory = '';
    showOutOfStockItems = false;
    outOfStockProducts = [];

    constructor(private _menuService: MenuService,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController) {
        this.getMenuItems();
        this._menuService.addSubCategory$.subscribe((isPresent) => {
            if (isPresent)
                this.getMenuItems();
        });
        this._menuService.addProduct$.subscribe((isPresent) => {
            if (isPresent)
                this.presentProductModal();
        });
    }

    private getMenuItems() {
        this._menuService.getMenu().subscribe((resp: any) => {
            console.log(resp);
            this.products = resp.productsByCategory;
        });
    }

    /**
     * Get Out of Stock Items
     */
    private getOutOfStockItems() {
        this._menuService.getOutOfStocks().subscribe((resp: any) => {
            this.outOfStockProducts = resp;
        });
    }

    selectWeightsModal(item) {
        this.presentWeightsModal(item);
    }

    menuSegmentChange(value) {
        console.log('value ', value);
        if (value.detail.value === 'out_of_stock') {
            this.showOutOfStockItems = true;
            this.getOutOfStockItems();
        } else {
            this.showOutOfStockItems = false;
            this.getMenuItems();
        }
    }

    canAddCateg() {
        this.canAddCategory = !this.canAddCategory;
    }

    /**
     * Add category
     */
    addCategory() {
        console.log('cat val ', this.newCategory);
        this._menuService.addCategory(this.newCategory).subscribe(() => {
            this.getMenuItems();
            this.newCategory = '';
            this.canAddCategory = false;
        }, () => {
            this.newCategory = '';
            this.canAddCategory = false;
        });
    }

    /**
     * Modal to add a subcategory or select to add a product
     * @param type
     */
    addItemOrSubcateg() {
        this.presentAddProductModal();
    }

    /**
     * Edit category name Alert
     */
    editCategoryAlert(type: string, catName: string) {
        this.presentCategoryAlert(type, catName);
    }

    /**
     * Edit Category name
     */
    editCategory(type: string, name: string) {
        if (type === 'category') {
            this._menuService.updateCategory(name).subscribe();
        } else {
            this._menuService.updateSubCategory(name).subscribe();
        }
    }

    /**
     * Modal to add a product
     */
    addItem() {
        this.presentProductModal();
    }

    updateItem(item) {
        this.presentProductModal(item);
    }

    deleteItem(item) {
        this.presentAlert(item);
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

    async presentProductModal(item?: any) {
        const modal = await this.modalCtrl.create({
            component: ItemModalPage,
            componentProps: {
                'item': item
            }
        });
        return await modal.present();
    }

    async presentAddProductModal() {
        const modal = await this.modalCtrl.create({
            component: ItemDialogPage,
            cssClass: 'modal-grosri'
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

    async presentCategoryAlert(type: string, catValue: string) {
        const alert = await this.alertCtrl.create({
            cssClass: 'alert-menu',
            header: 'Update Name',
            inputs: [
                {
                    name: 'categoryName',
                    type: 'text',
                    id: 'categoryName',
                    value: catValue
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Update',
                    handler: (alertData) => {
                        console.log('Add Sub category ', alertData.categoryName);
                        this.editCategory(type, alertData.categoryName);
                    }
                }
            ]
        });

        await alert.present();
    }


}