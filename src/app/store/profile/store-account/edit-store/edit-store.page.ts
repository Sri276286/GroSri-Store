import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonConstants } from 'src/app/store/constants/common.constants';
import { StoreService } from 'src/app/store/services/store.service';

@Component({
    templateUrl: 'edit-store.page.html'
})
export class EditStorePage implements OnInit {
    @Input() profile;
    storeForm: FormGroup;
    constructor(public modalCtrl: ModalController,
        private fb: FormBuilder,
        private storeService: StoreService) {
        this.storeForm = this.fb.group({
            storeName: ["", [Validators.required, Validators.minLength(6)]],
            storeImgUrl: [''],
            ownerName: [""],
            flatNo: [''],
            street: '',
            area: [""],
            landmark: '',
            mobileNumber: [""],
            storeCategory: ["", Validators.required],
            supplyItems: ''
        });
    }

    ngOnInit() {
        this.storeForm.patchValue(this.profile);
    }

    /**
     * Submit register form
     * @param isValid
     */
    updateStore(isValid: boolean) {
        console.log('is valid ', isValid);
        console.log('form ', this.storeForm);
        if (isValid) {
            this.storeService.updateStore(this.storeForm.value).subscribe(() => {
                console.log('store updated');
                this.modalCtrl.dismiss();
            });
        }
    }
}