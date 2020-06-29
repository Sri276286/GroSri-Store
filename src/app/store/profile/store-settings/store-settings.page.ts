import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { ModalController } from '@ionic/angular';

@Component({
    templateUrl: 'store-settings.page.html'
})
export class StoreSettingsPage implements OnInit {
    settingsForm: FormGroup;

    constructor(private fb: FormBuilder,
        private _storeService: StoreService,
        private modalCtrl: ModalController) { }

    ngOnInit() {
        this.settingsForm = this.fb.group({
            delivery_type: ['customer_pickup'],
            open_time: [''],
            close_time: [''],
            orders_per_slot: [''],
            delivery_slot: '',
            delivery_slots: [[]]
        });
    }

    get delivery_type() {
        return this.settingsForm.get('delivery_type').value;
    }

    get delivery_slots() {
        return this.settingsForm.get('delivery_slots');
    }

    addSlot() {
        console.log('new slot ', this.settingsForm.get('delivery_slot').value);
        const newSlot = this.settingsForm.get('delivery_slot').value;
        const deliverySlots = this.delivery_slots.value;
        this.delivery_slots.setValue([...deliverySlots, newSlot]);
        console.log('delivery slots ', this.delivery_slots.value);
        this.settingsForm.get('delivery_slot').setValue('');
    }

    removeSlot(slot: string) {
        console.log('slot ', slot);
        const deliverySlots = this.delivery_slots.value;
        const index = deliverySlots.indexOf(slot);
        console.log('index ', index);
        this.delivery_slots.value.splice(index, 1);
        console.log('delivery slots ', this.delivery_slots.value);
    }

    onSubmit(valid) {
        if (valid) {
            console.log('value ', this.settingsForm.value);
            this._storeService.saveStoreDetails(this.settingsForm.value).subscribe(() => {
                this.modalCtrl.dismiss();
            });
        }
    }
}