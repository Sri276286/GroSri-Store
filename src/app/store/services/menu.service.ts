import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiConfig } from 'src/app/config/api.config';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    menuURL: string = 'assets/mocks/menu.json';
    outOfStockURL: string = 'assets/mocks/outOfStocks.json';
    addSubCategory$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    addProduct$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    productHandleSuccess$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private productsList = [];
    private menu: any = {
        productsByCategory: {}
    };
    constructor(private _http: HttpClient,
        private _commonService: CommonService) { }

    /**
     * Get Store Menu
     */
    getMenu() {
        const storeId = this._commonService.getStoreId();
        return this._http.get(`${ApiConfig.storeMenuURL}/${storeId}`)
            .pipe(map((res: any) => {
                console.log('res ', res);
                if (res && res.data) {
                    console.log('memu ', this.mapMenu(res.data));
                    this.menu.productsByCategory = this.mapMenu(res.data);
                    console.log('all products list ', this.productsList);
                    res = this.menu;
                }
                return res;
            })
            );
    }

    getOutOfStocks() {
        return this._http.get(this.outOfStockURL);
    }

    addCategory(category) {
        const storeId = this._commonService.getStoreId();
        return this._http.post(ApiConfig.addCategoryURL, { category, storeId });
    }

    addSubCategory(category, subcategory) {
        const storeId = this._commonService.getStoreId();
        return this._http.post(ApiConfig.addCategoryURL, { category, subcategory, storeId });
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

    /**
     * Update product
     */
    updateProduct(product) {
        return this._http.put(`${ApiConfig.updateProductURL}`, product);
    }

    /**
     * Delete product
     */
    deleteProduct(id) {
        return this._http.get(`${ApiConfig.deleteProductURL}/${id}`);
    }

    uploadImage(file) {
        const uploadData = new FormData();
        uploadData.append('myFile', file, file.name);
        return this._http.post('my-backend.com/file-upload', uploadData, {
            reportProgress: true,
            observe: 'events'
        });
    }

    /**
     * Map Menu
     * @param res 
     */
    private mapMenu(data: any[]) {
        this.productsList = [];
        return data.reduce((acc, curr) => {
            if (curr.subcategory !== 'Main') {
                let sub = {};
                sub[curr.subcategory] = curr.storeInventoryProducts;
                // maintain products list
                this.productsList = [...this.productsList, ...curr.storeInventoryProducts];
                if (acc[curr.category]) {
                    acc[curr.category][curr.subcategory] = sub[curr.subcategory];
                } else {
                    acc[curr.category] = sub;
                }
            } else {
                acc[curr.category] = curr.storeInventoryProducts;
                // maintain products list
                this.productsList = [...this.productsList, ...curr.storeInventoryProducts];
            }
            return acc;
        }, {});
    }

    /**
     * API to get entire product list from menu
     * @param itemsRes
     */
    // private mapProducts(itemsRes: any) {
    //     console.log('ee ', itemsRes);
    //     this.productsList = [];
    //     for (let category in itemsRes) {
    //         if (Array.isArray(itemsRes[category])) {
    //             this.productsList = [...this.productsList, ...itemsRes[category]];
    //         } else {
    //             for (let subcategory in itemsRes[category]) {
    //                 this.productsList = [...this.productsList, ...itemsRes[category][subcategory]];
    //             }
    //         }
    //     }
    //     console.log('products list ', this.productsList);
    // }

    /**
     * Flatten items to categories that don't have sub category (Main)
     */
    // private flattenIfNoSubCategs(res: any) {
    //     for (let category in res) {
    //         const dataByCategory = res[category];
    //         for (let subcategory in dataByCategory) {
    //             const dataBySubCategory = dataByCategory[subcategory];
    //             if (subcategory === 'Main') {
    //                 res[category] = dataBySubCategory;
    //             }
    //         }
    //     }
    //     console.log('final res ', res);
    //     return res;
    // }

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
