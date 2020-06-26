import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiConfig } from 'src/app/config/api.config';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    menuURL: string = 'assets/mocks/menu.json';
    outOfStockURL: string = 'assets/mocks/outOfStocks.json';
    addSubCategory$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    addProduct$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private productsList = [];
    constructor(private _http: HttpClient) {

    }

    /**
     * Get Store Menu
     */
    getMenu() {
        return this._http.get(ApiConfig.storeMenuURL)
            // return this._http.get(this.menuURL)
            .pipe(tap((res: any) => {
                this.mapProducts(res && res.productsByCategory);
            }));
    }

    getOutOfStocks() {
        return this._http.get(this.outOfStockURL);
    }

    addCategory(category) {
        return this._http.post(`/addCategory`, { category });
    }

    addSubCategory(subcategory) {
        return this._http.post(`/addSubCategory`, { subcategory });
    }

    updateCategory(category) {
        return this._http.post(`/updateCategory`, { category });
    }

    updateSubCategory(subcategory) {
        return this._http.post(`/updateSubCategory`, { subcategory });
    }

    /**
     * Add a new product
     */
    addProduct(product) {
        return this._http.post(`${ApiConfig.addProductURL}`, product);
    }

    uploadImage(file) {
        const uploadData = new FormData();
        uploadData.append('myFile', file, file.name);
        return this._http.post('my-backend.com/file-upload', uploadData, {
            reportProgress: true,
            observe: 'events'
        });
    }

    private mapProducts(itemsRes: any) {
        this.productsList = [];
        for (let category in itemsRes) {
            for (let subcategory in itemsRes[category]) {
                this.productsList = [...this.productsList, ...itemsRes[category][subcategory]];
            }
        }
    }

    /**
     * Search store for any product
     */
    searchStore(search: string) {
        console.log('products ', this.productsList);
        const searchResults = this.productsList.filter((t) => {
            const pattern = new RegExp(search, 'gi');
            return pattern.test(t.productName) || pattern.test(t.brandName) || pattern.test(t.itemShortDescription);
        });
        return of(searchResults);
    }
}
