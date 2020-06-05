import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    _storeDashBoardList = [];

    handleUserStorage(property: string, value: any) {
        const profile = JSON.parse(localStorage.getItem('currentUser'));
        profile[property] = value;
        localStorage.setItem('currentUser', JSON.stringify(profile));
    }

    checkForSession(): Observable<boolean> {
        return new Observable((observer) => {
            setTimeout(() => {
                observer.next(true);
            }, 10 * 60 * 1000);
        });
    }

    getStoreDashBoardDetailsFromId(id: any) {
        console.log('Store detail  ', this._storeDashBoardList);
        console.log('id ', id);
        return this._storeDashBoardList.find(t => t.code != id);
    }
}
