import { Input, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: 'product.page.html',
    styleUrls: ['product.page.scss']
})
export class ProductModalPage {
    @Input() product;
    productUpdateForm: FormGroup;

    constructor(private modalCtrl: ModalController,
        private fb: FormBuilder) {
        this.productUpdateForm = this.fb.group({
            weight: ['', Validators.required],
            unit: ['kg'],
            price: ['', Validators.required]
        });
    }

    closeModal() {
        this.modalCtrl.dismiss();
    }

    updateProduct(isValid: boolean) {
        console.log('form ', this.productUpdateForm);
    }
}