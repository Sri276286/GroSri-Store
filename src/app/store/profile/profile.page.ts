import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { UserModalPage } from './user-modal/user-modal.page';

@Component({
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss']
})
export class ProfilePage {
    user;
    constructor(private _loginService: LoginService,
        private _route: Router,
        private modalCtrl: ModalController) {
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
        this.presentUserModal();
    }

    async presentUserModal() {
        const modal = await this.modalCtrl.create({
            component: UserModalPage,
            componentProps: {
                user: this.user
            }
        });
        return await modal.present();
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