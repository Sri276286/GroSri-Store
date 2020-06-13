import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuService } from '../../services/menu.service';

@Component({
    templateUrl: 'item-dialog.page.html'
})
export class ItemDialogPage {
    newSubCategory = '';
    constructor(private modalCtrl: ModalController,
        private _menuService: MenuService) {

    }

    addSubCategory() {
        this._menuService.addSubCategory(this.newSubCategory).subscribe(() => {
            this.newSubCategory = '';
            this._menuService.addSubCategory$.next(true);
            this.closeModal();
        });
    }

    addProduct() {
        this._menuService.addProduct$.next(true);
        this.closeModal();
    }

    closeModal() {
        this.modalCtrl.dismiss();
    }
}
