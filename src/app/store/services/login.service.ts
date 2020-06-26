import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from 'src/app/config/api.config';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private _http: HttpClient) {

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
            }));
    }

    /**
 * Logout url
 */
    doLogout() {
        return this._http.get(ApiConfig.logoutURL);
    }
}
