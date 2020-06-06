import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonConstants } from '../constants/common.constants';

@Component({
    selector: 'gro-store-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss']
})
export class LoginPage {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', [Validators.required,
            Validators.pattern(CommonConstants.password)]]
        });
    }

    submit(isvalid: boolean) {

    }
}