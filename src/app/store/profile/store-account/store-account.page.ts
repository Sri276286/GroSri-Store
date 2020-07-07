import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StoreService } from '../../services/store.service';
import { CommonService } from '../../services/common.service';
import { EditStorePage } from './edit-store/edit-store.page';

@Component({
    templateUrl: 'store-account.page.html'
})
export class StoreAccountPage implements OnInit {
    storeProfile;
    constructor(public modalCtrl: ModalController,
        private _storeService: StoreService,
        private _commonService: CommonService) { }

    ngOnInit() {
        this._storeService.getStoreById().subscribe((res: any) => {
            console.log('store profile ', res);
            this.storeProfile = res && res.store;
        });
    }

    editStore() {
        this._commonService.presentModal(EditStorePage, {profile: this.storeProfile});
    }

}
