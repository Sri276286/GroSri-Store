import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfig } from 'src/app/config/api.config';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    constructor(private _http: HttpClient) {

    }

    getStoreById(id: string) {
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
     * Save Store details
     * @param store
     */
    saveStoreDetails(store) {
        return this._http.post(ApiConfig.storeRegisterURL, store);
    }
}