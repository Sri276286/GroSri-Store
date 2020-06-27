import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuService } from '../../services/menu.service';

@Component({
    templateUrl: 'item-dialog.page.html'
})
export class ItemDialogPage {
    newSubCategory = '';
    @Input() category: string;
    constructor(private modalCtrl: ModalController,
        private _menuService: MenuService) {

    }

    addSubCategory(category: string) {
        this._menuService.addSubCategory(this.newSubCategory).subscribe(() => {
            this.newSubCategory = '';
            this._menuService.addSubCategory$.next(true);
            this.closeModal();
        });
    }

    addProduct() {
        this._menuService.addProduct$.next(this.category);
        this.closeModal();
    }

    closeModal() {
        this.modalCtrl.dismiss();
    }
}
