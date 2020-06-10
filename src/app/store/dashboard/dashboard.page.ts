import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { StoreOrder } from '../models/store.model';
import { ToastController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public currentOrders: StoreOrder[] = [];
  constructor(private _dashboardService: DashboardService,
    private toastCtrl: ToastController,
    private menuCtrl: MenuController) { }

  ngOnInit() {
    this.getDashBoardDetails();
    setTimeout(() => {
      this.presentToastWithOptions();
    }, 1000);
  }

  private getDashBoardDetails() {
    this._dashboardService.getCurrentOrders().subscribe((res: StoreOrder[]) => {
      this.currentOrders = res;
      console.log('resss ', res);
    });
  }

  openMenu() {
    this.openMenuItems();
  }

  async openMenuItems() {
    await this.menuCtrl.open();
  }

  async presentToastWithOptions() {
    const toast = await this.toastCtrl.create({
      header: 'New Order',
      message: '22 items | Rs.1200',
      position: 'top',
      color: 'secondary',
      buttons: [
        {
          side: 'end',
          icon: 'refresh',
          handler: () => {
            this.getDashBoardDetails();
          }
        }
      ]
    });
    toast.present();
  }


}
