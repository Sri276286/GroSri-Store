import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { StoreOrder } from '../models/store.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public currentOrders: StoreOrder[] = [];
  constructor(private _dashboardService: DashboardService,
    private _router: Router) { }

  ngOnInit() {
    this.getDashBoardDetails();
  }

  private getDashBoardDetails() {
    this._dashboardService.getCurrentOrders().subscribe((res: StoreOrder[]) => {
      this.currentOrders = res;
      console.log('resss ', res);
    });
  }

  viewOrder(id: string) {
    console.log('aaa');
    this._router.navigate(['/order']);
  }

  viewOrder1() {
    console.log('abcccc');
  }

}
