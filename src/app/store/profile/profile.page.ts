import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { UserModalPage } from './user-modal/user-modal.page';
import { CommonService } from '../services/common.service';
import { StoreSettingsPage } from './store-settings/store-settings.page';

@Component({
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss']
})
export class ProfilePage {
    user;
    constructor(private _loginService: LoginService,
        private _route: Router,
        private _commonService: CommonService) {
        this._loginService.getCurrentUser().subscribe((user) => {
            console.log('current user ', user);
            if (!user) {
                this._loginService.getUser().subscribe((user) => {
                    this.user = user;
                })
            } else {
                this.user = user;
            }
        });
    }

    editProfile() {
        const user = {
            user: this.user
        };
        this._commonService.presentModal(UserModalPage, user)
    }

    storeSettingsModal() {
        this._commonService.presentModal(StoreSettingsPage);
    }

    logout() {
        this._loginService.doLogout().subscribe(() => {
            this.logoutReset();
        }, () => {
            this.logoutReset();
        });
    }

    logoutReset() {
        localStorage.clear();
        this._route.navigate(['/login']);
    }
}