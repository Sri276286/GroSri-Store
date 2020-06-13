import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonConstants } from '../constants/common.constants';
import { ConfirmPasswordValidator } from '../services/confirm.password';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'gro-store-signup',
    templateUrl: 'signup.page.html',
    styleUrls: ['signup.page.scss']
})
export class SignupPage {
    registerForm: FormGroup;

    constructor(private fb: FormBuilder,
        private loginService: LoginService,
        private _router: Router) {
        this.registerForm = this.fb.group({
            name: ["", [Validators.required, Validators.minLength(6)]],
            email: ["", [Validators.email]],
            mobileNumber: ["", [Validators.required, Validators.pattern(CommonConstants.phoneNumber)]],
            password: ["", [Validators.required, Validators.pattern(CommonConstants.password)]],
            confirm_password: ["", [Validators.required,
                ConfirmPasswordValidator]]
        });
    }

    /**
     * Submit register form
     * @param isValid
     */
    onSubmit(isValid: boolean) {
        console.log('is valid ', isValid);
        console.log('form ', this.registerForm);
        if (isValid) {
            this.loginService.register(this.registerForm.value).subscribe(() => {
                console.log('registered');
                this._router.navigate(['/login']);
            });
        }
    }
}