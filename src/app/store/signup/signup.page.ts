import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonConstants } from '../constants/common.constants';
import { ConfirmPasswordValidator } from '../services/confirm.password';

@Component({
    selector: 'gro-store-signup',
    templateUrl: 'signup.page.html',
    styleUrls: ['signup.page.scss']
})
export class SignupPage {
    registerForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.registerForm = this.fb.group({
            name: ["", [Validators.required, Validators.minLength(6)]],
            email: ["", [Validators.email]],
            mobileNumber: ["", [Validators.required, Validators.pattern(CommonConstants.phoneNumber)]],
            password: ["", [Validators.required, Validators.pattern(CommonConstants.password)]],
            confirm_password: ["", [Validators.required,
                ConfirmPasswordValidator]]
        });
    }

    onSubmit(isValid: boolean) {

    }
}