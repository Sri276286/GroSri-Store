import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ModalController } from '@ionic/angular';
import { ProductModalPage } from './product/product.page';
import { DashboardService } from '../services/dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  products = [];
  selected: boolean = false;
  orderId: string = '';
  constructor(private _route: ActivatedRoute,
    private modalCtrl: ModalController,
    private _dashboardService: DashboardService) { }

  ngOnInit(): void {
    // this.products = this._commonService.getOrderedProductsById('65');
    // console.log('products ', this.products);
    this._route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      this.orderId = id;
      this._dashboardService.getOrderById(id).subscribe((resp: any) => {
        this.products = resp && resp.orders && resp.orders.length && resp.orders[0].orderProducts;
      });
    });
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
