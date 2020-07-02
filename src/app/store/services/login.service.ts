import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from 'src/app/config/api.config';
import { tap, map } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    private currentUser$: Observable<User>;

    constructor(private _http: HttpClient,
        private _commonService: CommonService) {
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    public getCurrentUser(): Observable<any> {
        return this.currentUser$;
    }

    public isTokenValid(): Observable<any> {
        const auth_token = localStorage.getItem('auth_token');
        if (auth_token) {
            let params = new HttpParams();
            params = params.append('token', auth_token);
            return this._http.get(ApiConfig.tokenURL, { params });
        } else {
            return throwError('Invalid Token');
        }
    }

    /**
     * Register a store admin/manager
     */
    register(user) {
        return this._http.post(ApiConfig.registerURL, user);
    }

    login(user) {
        return this._http.post(ApiConfig.loginURL, user)
            .pipe(tap((resp: any) => {
                localStorage.setItem('auth_token', resp.accessToken);
                localStorage.setItem('session_active', 'true');
                // get user details once login is successful
                this.getUser().subscribe();
            }));
    }

    /**
     * Get user details
    */
    public getUser() {
        return this._http.get(ApiConfig.userDetailsURL)
            .pipe(map((res: any) => {
                const user = res && res.data;
                // TODO: Update hard coded value
                localStorage.setItem('storeId', '1');
                this._commonService.getStoreId$.next('1');
                // login successful if there's a jwt token in the response
                if (user) {
                    this._mapUser(user);
                }
                return user;
            }));
    }

    /**
     * Get All stores
     */
    public getStores() {
        return this._http.get(ApiConfig.storesByAdminURL)
            .pipe(map((res) => {
                console.log('res  ', res);
            }));
    }

    /**
     * Save/Update user details
     */
    public saveUserDetails(user) {
        return this._http.post(ApiConfig.userUpdateURL, user)
            .pipe(tap(() => {
                this._mapUser(user);
            }));
    }


    private _mapUser(user) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.currentUserSubject.next(user);
    }

    /**
     * Logout url
    */
    doLogout() {
        return this._http.get(ApiConfig.logoutURL);
    }
}
