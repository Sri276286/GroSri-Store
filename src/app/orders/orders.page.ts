import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  isActive: boolean = true;
  isActiveg: boolean = true;

  _dashBoardDetails : any[] =[];

  constructor(private _commonService: CommonService) { }

  ngOnInit(): void {
    this.setOrderDetails();
  }


  setEdit(){
    console.error("th"+this.isActive);
    // this.isActive = this.isActive;
    // console.error(this.isActive);
  }

  setOrderDetails(){
   this._dashBoardDetails =  this._commonService.getStoreDashBoardDetailsFromId(10);
   console.error("test"+JSON.stringify(this._dashBoardDetails));
  }

}
