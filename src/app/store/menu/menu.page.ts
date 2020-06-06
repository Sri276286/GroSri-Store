import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
    templateUrl: 'menu.page.html',
    styleUrls: ['menu.page.scss']
})
export class MenuPage {
    products;
    public appPages: any;
    showItems = false;
    // showLevel1 = null;
    // showLevel2 = null;
    // showLevel3 = null;

    constructor(private _menuService: MenuService) {
        this._menuService.getMenu().subscribe((resp: any) => {
            console.log(resp);
            // this.appPages = resp;
            this.products = resp.productsByCategory;
        });
    }

    // clearLevel() {
    //     this.showLevel1 = null;
    //     this.showLevel2 = null;
    //     this.showLevel3 = null;
    // }

    // toggleLevel1(idx: string) {
    //     if (this.isLevel1Shown(idx)) {
    //         this.showLevel1 = null;
    //     } else {
    //         this.showLevel1 = idx;
    //     }
    // }

    // isLevel1Shown(idx: string) {
    //     return this.showLevel1 === idx;
    // }

    // toggleLevel2(idx: string) {
    //     if (this.isLevel2Shown(idx)) {
    //         this.showLevel2 = null;
    //     } else {
    //         this.showLevel1 = idx;
    //         this.showLevel2 = idx;
    //     }
    // }

    // isLevel2Shown(idx: string) {
    //     return this.showLevel2 === idx;
    // }

    // toggleLevel3(idx: string) {
    //     if (this.isLevel3Shown(idx)) {
    //         this.showLevel3 = null;
    //     } else {
    //         this.showLevel2 = idx;
    //         this.showLevel3 = idx;
    //     }
    // }

    // isLevel3Shown(idx: string) {
    //     return this.showLevel3 === idx;
    //   }
}