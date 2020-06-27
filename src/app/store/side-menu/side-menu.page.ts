import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'gro-side-menu',
    templateUrl: 'side-menu.page.html'
})
export class SideMenuPage {

    constructor(private _loginService: LoginService,
        private _router: Router) { }

    logout() {
        console.log('logout');
        this._loginService.doLogout().subscribe(() => {
            this.logoutReset();
        }, () => {
            this.logoutReset();
        });
    }

    logoutReset() {
        localStorage.clear();
        this._router.navigate(['/login']);
    }
}