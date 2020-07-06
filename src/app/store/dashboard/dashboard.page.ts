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

  public currentOrders: StoreOrder[] = [];
  constructor(private _dashboardService: DashboardService,
    private toastCtrl: ToastController,
    private menuCtrl: MenuController,
    private _commonService: CommonService) { 
      console.log('abc');
    }

  ngOnInit() {
    console.log('on init');
    this._commonService.presentLoading('Getting orders. Please wait...');
    setTimeout(() => {
      console.log('heeeee');
      this.getDashBoardDetails();
    }, 500);
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

  private getDashBoardDetails() {
    this._dashboardService.getCurrentOrders().subscribe((res: StoreOrder[]) => {
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
      this.getDashBoardDetails();
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
            this.getDashBoardDetails();
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
