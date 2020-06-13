import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonConstants } from '../constants/common.constants';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'gro-store-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss']
})
export class LoginPage {
    loginForm: FormGroup;
    test = true;

    constructor(private fb: FormBuilder,
        private loginService: LoginService,
        private _router: Router) {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', [Validators.required,
            Validators.pattern(CommonConstants.password)]]
        });
    }

    /**
     * Submit login form
     * @param isvalid
     */
    submit(isvalid: boolean) {
        console.log('forrr ', this.loginForm.value);
        if (isvalid) {
            this.loginService.login(this.loginForm.value).subscribe(() => {
                this._router.navigate(['/dashboard']);
            });
        }
    }
}