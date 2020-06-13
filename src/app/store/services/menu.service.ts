import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    menuURL: string = 'assets/mocks/menu.json';
    addSubCategory$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    addProduct$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(private _http: HttpClient) {

    }

    getMenu() {
        return this._http.get(this.menuURL);
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

    uploadImage(file) {
        const uploadData = new FormData();
        uploadData.append('myFile', file, file.name);
        return this._http.post('my-backend.com/file-upload', uploadData, {
            reportProgress: true,
            observe: 'events'
        });
    }
}
