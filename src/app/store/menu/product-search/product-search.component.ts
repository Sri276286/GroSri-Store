import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MenuService } from '../../services/menu.service';
import { ModalController } from '@ionic/angular';

@Component({
    templateUrl: 'product-search.component.html'
})
export class ProductSearchPage implements OnInit {
    searchProducts = [];
    queryField: FormControl = new FormControl();

    constructor(private _menuService: MenuService,
        private modalCtrl: ModalController) {

    }
    ngOnInit() {
        this.queryField.valueChanges
            .pipe(debounceTime(1000))
            .subscribe((result) => {
                console.log('search res ', result);
                if (result && result.length) {
                    this._menuService.searchStore(result)
                        .subscribe((response: any[]) => {
                            console.log('abc resss ', response);
                            this.searchProducts = response;
                        })
                } else {
                    this.searchProducts = [];
                }
            })
    }

    /**
     * Clears a search and reset values
     */
    clearSearch() {
        this.queryField.setValue('');
        this.searchProducts = [];
    }

    dismissModal() {
        this.modalCtrl.dismiss();
    }
}