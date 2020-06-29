import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from 'src/app/config/api.config';
import { map } from 'rxjs/operators';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class BusinessService {
    constructor(private _http: HttpClient,
        private _commonService: CommonService) { }

    getRevenueByStore() {
        const storeId = this._commonService.getStoreId();
        return this._http.get(`${ApiConfig.revenueURL}/${storeId}`)
    }
}
