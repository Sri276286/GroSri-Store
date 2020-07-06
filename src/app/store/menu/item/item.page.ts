import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component({
    templateUrl: 'item.page.html',
    styleUrls: ['item.page.scss']
})
export class ItemModalPage implements OnInit {

    @Input('item') item;
    @Input('category') category;
    @Input('subCategory') subCategory;
    productForm: FormGroup;
    weights: FormArray;
    constructor(private _menuService: MenuService,
        private _commonService: CommonService,
        private modalCtrl: ModalController,
        private fb: FormBuilder) {

    }

    ngOnInit() {
        this.productForm = this.fb.group({
            id: '',
            productName: ['', Validators.required],
            brandName: '',
            itemShortDescription: '',
            storeId: this._commonService.getStoreId(),
            productCategory: this.category,
            productSubCategory: this.subCategory || 'Main',
            storeInventoryProductUnit: this.fb.array([this.weightForm()]),
            available_quantity: '',
            itemLongDescription: '',
            max_quantity: '',
            mrp: '',
            price: '',
            productImgUrl: '',
            productSub2Category: '',
            quantity: '',
            storeStoreName: '',
            unit: '',
            weight: '',
            storeInventoryProductUnitId: ''
        });
        console.log('item => ', this.item);
        if (this.item) {
            this.category = this.item.productCategory;
            this.subCategory = this.item.productSubCategory;
            this.loadProduct(this.item);
        }
    }

    loadProduct(item) {
        console.log('item ', item);
        const weights = item.storeInventoryProductUnit;
        // empty form array
        if (weights && weights.length) {
            this.w.removeAt(0);
        }
        // use patchValue instead of setValue
        this.productForm.patchValue(item);
        // add form array values in a loop
        weights.forEach(element => {
            this.w.push(this.fb.group(element));
        });
    }

    // convenience getters for easy access to form fields
    get f() { return this.productForm.controls; }
    get w() { return this.f.storeInventoryProductUnit as FormArray; }

    weightForm(): FormGroup {
        return this.fb.group({
            // imageUrl: '',
            id: '',
            storeInventoryProductId: '',
            available_quantity: ['', Validators.required],
            weight: ['', Validators.required],
            unit: ['kg', Validators.required],
            mrp: [''],
            price: ['', Validators.required],
            max_quantity: '',
            quantity: ''

        });
    }

    addWeight() {
        // console.log('w controls ', this.w.controls);
        this.w.push(this.weightForm());
    }

    /**
     * Add new product/ Update existing product
     */
    submitProduct() {
        const isValid = this.productForm.valid;
        console.log('is valid ', isValid);
        if (isValid) {
            console.log('value ', this.productForm.value);
            if (this.item) {
                console.log('item ', this.item);
                this._menuService.updateProduct(this.productForm.value).subscribe(() => {
                    this._menuService.productHandleSuccess$.next(true);
                }, () => {
                    this._commonService.presentToast('Failed to update product');
                    this.closeModal();
                });
            } else {
                this._menuService.addProduct(this.productForm.value).subscribe(() => {
                    this._menuService.productHandleSuccess$.next(true);
                }, () => {
                    this._commonService.presentToast('Failed to add a product');
                    this.closeModal();
                });
            }
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
        console.log('close modal');
        this.modalCtrl.dismiss();
    }


}