import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
    templateUrl: 'item.page.html',
    styleUrls: ['item.page.scss']
})
export class ItemModalPage implements OnInit {

    @Input('item') item;
    productForm: FormGroup;
    weights: FormArray;
    constructor(private _menuService: MenuService,
        private modalCtrl: ModalController,
        private fb: FormBuilder) {

    }

    ngOnInit() {
        this.productForm = this.fb.group({
            productName: ['', Validators.required],
            brandName: '',
            itemShortDescription: '',
            weights: this.fb.array([this.weightForm()])
        });
        console.log('item => ', this.item);
        if (this.item) {
            this.loadProduct(this.item);
        }
    }

    loadProduct(item) {
      this.productForm.get('productName').setValue(item.productName);
      this.productForm.get('brandName').setValue(item.brandName);
      this.productForm.get('itemShortDescription').setValue(item.itemShortDescription);
      this.productForm.get('weights').patchValue(item.storeInventoryProductUnit);
    }

    // convenience getters for easy access to form fields
    get f() { return this.productForm.controls; }
    get w() { return this.f.weights as FormArray; }

    weightForm(): FormGroup {
        return this.fb.group({
            imageUrl: '',
            available_quantity: ['', Validators.required],
            weight: ['', Validators.required],
            unit: ['kg', Validators.required],
            mrp: [''],
            price: ['', Validators.required]
        });
    }

    addWeight() {
        this.w.push(this.weightForm());
    }

    addProduct() {
        const isValid = this.productForm.valid;
        console.log('is valid ', isValid);
        if (isValid) {
            console.log('value ', this.productForm.value);
        }
    }

    selectFile(event) {
        const file = event.target.files[0];
        this.uploadImage(file);
    }

    uploadImage(file) {
        this._menuService.uploadImage(file).subscribe((event) => {
            console.log('event ', event);
        });
    }

    closeModal() {
        this.modalCtrl.dismiss();
    }


}