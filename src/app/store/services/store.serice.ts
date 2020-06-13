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
}