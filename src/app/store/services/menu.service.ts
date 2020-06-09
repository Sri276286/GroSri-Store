import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    menuURL: string = 'assets/mocks/menu.json';
    constructor(private _http: HttpClient) {

    }

    getMenu() {
        return this._http.get(this.menuURL);
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
