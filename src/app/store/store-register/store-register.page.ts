import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonConstants } from '../constants/common.constants';
import { Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { CommonService } from '../services/common.service';

@Component({
    selector: 'gro-store-register',
    templateUrl: 'store-register.page.html',
    styleUrls: ['store-register.page.scss']
})
export class StoreRegisterPage {
    storeRegisterForm: FormGroup;

    constructor(private fb: FormBuilder,
        private storeService: StoreService,
        private _router: Router,
        private _commonService: CommonService) {
        this.storeRegisterForm = this.fb.group({
            storeName: ["", [Validators.required, Validators.minLength(6)]],
            storeOwnerName: [""],
            area: ["", [Validators.required]],
            city: ["", [Validators.required]],
            storeContactNumber: ["", [Validators.required, Validators.pattern(CommonConstants.phoneNumber)]],
            storeCategory: [[], Validators.required]
        });
    }

    // categoryForm(): FormGroup {
    //     return this.fb.group({
    //         id: '',
    //         category: ['', Validators.required],
    //         isDefault: false,
    //         storeId: ''
    //     });
    // }

    /**
     * Submit register form
     * @param isValid
     */
    onSubmit(isValid: boolean) {
        console.log('is valid ', isValid);
        const categs = this.storeRegisterForm.get('storeCategory').value;
        this.storeRegisterForm.get('storeCategory').setValue(this._mapCategs(categs));
        console.log('form ', this.storeRegisterForm);
        if (isValid) {
            this.storeService.storeRegister(this.storeRegisterForm.value).subscribe(() => {
                console.log('store registered');
                this._commonService.presentToast('Thank you for registering with us. We will contact you shortly', 'middle');
                this._router.navigate(['/login']);
            });
        }
    }

    /**
     * Map categories as objects
     * @param categs
     */
    private _mapCategs(categs) {
        return categs.map((categ) => {
            return {
                category: categ
            }
        });
    }
}