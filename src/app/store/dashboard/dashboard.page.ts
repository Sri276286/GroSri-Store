import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { StoreOrder } from '../models/store.model';
import { ToastController, MenuController } from '@ionic/angular';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  isOnline: boolean = false;
  public currentOrders: StoreOrder[] = [];
  constructor(private _dashboardService: DashboardService,
    private toastCtrl: ToastController,
    private menuCtrl: MenuController,
    private _commonService: CommonService) {
    console.log('abc');
  }

  ngOnInit() {
    if (navigator.onLine) {
      this.isOnline = true;
    }
    console.log('on init');
    this._commonService.presentLoading('Getting orders. Please wait...');
    this.getDashboardDetails();
    // if store id present, then get orders
    this._commonService.getStoreId$.subscribe((storeId: any) => {
      console.log('store id ', storeId);
      if (storeId) {
        this.getDashboardDetails(storeId);
      }
    });
    // Look for new orders every 15 minutes.
    setInterval(() => {
      this.newOrder();
    }, 15 * 60 * 1000);
  }

  private newOrder() {
    this._dashboardService.getNewOrder().subscribe((order: any) => {
      this.presentToastWithOptions(order);
    });
  }

  private getDashboardDetails(id?: any) {
    this._dashboardService.getCurrentOrders(id).subscribe((res: StoreOrder[]) => {
      this.currentOrders = res;
      console.log('resss ', res);
    });
  }

  /**
   * Do manual refresh
   */
  doRefresh(event) {
    console.log('event ', event);
    this.newOrder();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 5000);
  }

  /**
   * Update Order status from New -> Accepted -> Prepared -> Ready -> Delivered
   */
  updateOrderStatus(order, reject?: boolean) {
    console.log('order ', order);
    this._dashboardService.updateOrderStatus(order.id, order.orderStatus, reject).subscribe(() => {
      this.getDashboardDetails();
    });
  }

  openMenu() {
    this.openMenuItems();
  }

  async openMenuItems() {
    await this.menuCtrl.open();
  }

  async presentToastWithOptions(order) {
    const noOfItems = order && order.totalNoProducts;
    const total = order && order.billTotal;
    const toast = await this.toastCtrl.create({
      header: 'New Order',
      message: noOfItems + ' item(s) | Rs.' + total,
      position: 'top',
      color: 'success',
      buttons: [
        {
          side: 'end',
          icon: 'refresh',
          handler: () => {
            this.getDashboardDetails();
          }
        },
        {
          side: 'start',
          icon: 'close',
          handler: () => {
            toast.dismiss();
          }
        }
      ]
    });
    toast.present();
  }

}
