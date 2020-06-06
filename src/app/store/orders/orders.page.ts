import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ModalController } from '@ionic/angular';
import { ProductModalPage } from './product/product.page';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  products = [];
  selected: boolean = false;
  constructor(private _commonService: CommonService,
    private modalCtrl: ModalController) { }

  ngOnInit(): void {
    this.products = this._commonService.getOrderedProductsById('65');
    console.log('products ', this.products);
  }

  onProductSelect() {
    this.selected = !this.selected;
  }

  editProduct(product) {
    this.presentModal(product);
  }

  async presentModal(product) {
    const modal = await this.modalCtrl.create({
      component: ProductModalPage,
      cssClass: 'modal-grosri',
      componentProps: {
        'product': product
      }
    });
    return await modal.present();
  }

}
