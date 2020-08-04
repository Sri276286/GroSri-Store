import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormArray, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { PhotoService } from '../../services/photo.service';

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
    photo;
    constructor(private _menuService: MenuService,
        private _commonService: CommonService,
        private modalCtrl: ModalController,
        private fb: FormBuilder,
        private photoService: PhotoService) {
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
            storeInventoryProductUnitId: '',
            customUnit:''
        });
        console.log('item => ', this.item);
        if (this.item) {
            this.category = this.item.productCategory;
            this.subCategory = this.item.productSubCategory;
            this.loadProduct(this.item);
        }
    }

   
      

    /**
     * Add a photo
     * @param number
     */
    addPhoto(number) {
        this.photoService.addNewToGallery(number).then(() => {
            this.loadPhoto(number);
        });
    }

    /**
     * Load a photo
     * @param number
     */
    loadPhoto(number) {
        this.photoService.loadSaved(number).then((photo) => {
            this.photo = photo;
        });
    }

    loadProduct(item) {
        console.log('item ', item);
        const discountObservableFields = ["mrp","price"];
        let weights = item.storeInventoryProductUnit;
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
        this.w.controls.forEach(form => {

            //update values on initial form load
            this.updateDiscounts(form);
            //disable discount fields
            this.disableControlInForm(form , "discount");
            discountObservableFields.forEach((field)=>{
                form.get(field).valueChanges.subscribe(()=>{
                    this.updateDiscounts(form)
                })
            })
        })
        
    }

    private updateDiscounts(form : AbstractControl){
        const mrp = form.get("mrp").value;
        const price = form.get("price").value;
        let discountValue = mrp !== 0 ? (mrp - price)/mrp * 100 : 0;//prevent divide by zero
        discountValue = Math.round(discountValue * 100) / 100;
        form.patchValue({discount : discountValue});
    }
    private disableControlInForm(form : AbstractControl, fieldName : string){
        form.get(fieldName).disable();
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
            customUnit: '',
            default:false,
            unit: ['kg', Validators.required],
            mrp: [''],
            price: ['', Validators.required],
            max_quantity: '',
            quantity: '',
            discount: [{value : '', disabled : true}]

        },
        );
        
    }
    setThisWeightAsDefault(formGroupIndex : number){
        this.w.controls.forEach((control,index)=>{
            
            //control.patchValue({isDefault : false});
            // console.log("index : "  + formGroupIndex);
            
            if(index !== formGroupIndex){  
                control.patchValue({default : false});
            }
            else{
                control.value.default = true;
            }

            console.log(control.value);

            
        })
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