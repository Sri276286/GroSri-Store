import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { StoreService } from '../services/store.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'store-validate.page.html',
    styleUrls: ['./store-validate.page.scss']
})
export class StoreValidatePage {
    storeValidateForm: FormGroup;
    constructor(private fb: FormBuilder,
        private storeService: StoreService,
        private _router: Router) {
        this.storeValidateForm = this.fb.group({
            storeId: ['', Validators.required]
        });
    }

    /**
     * Validate a store id
     * @param isvalid
     */
    submit(isvalid: boolean) {
        console.log('is valid ', isvalid);
        if (isvalid) {
            this.storeService.validateStore(this.storeValidateForm.value).subscribe(() => {
                this._router.navigate(['/register']);
            });
        }
    }
}