import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { OrderProducts } from '../models/store.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  products = [];
  constructor(private _commonService: CommonService) { }

  ngOnInit(): void {
    this.products = this._commonService.getOrderedProductsById('65');
    console.log('products ', this.products);
  }

}
