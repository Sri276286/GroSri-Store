import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonConstants } from '../constants/common.constants';
import { Router } from '@angular/router';
import { StoreService } from '../services/store.service';

@Component({
    selector: 'gro-store-register',
    templateUrl: 'store-register.page.html',
    styleUrls: ['store-register.page.scss']
})
export class StoreRegisterPage {
    storeRegisterForm: FormGroup;

    constructor(private fb: FormBuilder,
        private storeService: StoreService,
        private _router: Router) {
        this.storeRegisterForm = this.fb.group({
            name: ["", [Validators.required, Validators.minLength(6)]],
            owner_name: [""],
            area: [""],
            city: "",
            mobileNumber: ["", [Validators.required, Validators.pattern(CommonConstants.phoneNumber)]],
            store_type: [""]
        });
    }

    /**
     * Submit register form
     * @param isValid
     */
    onSubmit(isValid: boolean) {
        console.log('is valid ', isValid);
        console.log('form ', this.storeRegisterForm);
        if (isValid) {
            this.storeService.storeRegister(this.storeRegisterForm.value).subscribe(() => {
                console.log('store registered');
                this._router.navigate(['/login']);
            });
        }
    }
}