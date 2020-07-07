import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfig } from 'src/app/config/api.config';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    constructor(private _http: HttpClient,
        private _commonService: CommonService) {

    }

    getStoreById() {
        const id = this._commonService.getStoreId();
        return this._http.get(`${ApiConfig.storeDetailsURL}/${id}`);
    }

    validateStore(id: string) {
        return this._http.get(`${ApiConfig.storeValidateURL}/${id}`);
    }

    /**
     * Register a store
     */
    storeRegister(store) {
        return this._http.post(ApiConfig.storeRegisterURL, store);
    }

    /**
     * Update a store
     * @param store
     */
    updateStore(store) {
        return this._http.put(ApiConfig.storeUpdateURL, store);
    }

    /**
     * Save Store details
     * @param store
     */
    saveStoreDetails(store) {
        return this._http.post(ApiConfig.storeRegisterURL, store);
    }
}