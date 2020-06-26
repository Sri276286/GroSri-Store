import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoginService } from './store/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _router: Router,
    private _loginService: LoginService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.routehandler();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    console.log('logout');
    this._loginService.doLogout().subscribe(() => {
      this.logoutReset();
    }, () => {
      this.logoutReset();
    });
  }

  logoutReset() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  // private routehandler() {
  //   this._router.events
  //     .pipe(filter((e) => e instanceof NavigationEnd))
  //     .subscribe((event: NavigationEnd) => {
  //       const validate = this.validateURL(event);
  //       if (validate) {
  //         this.hideTabs();
  //       } else {
  //         this.showTabs();
  //       }
  //     });
  // }

  // private hideTabs() {
  //   const tabBar = document.getElementById('myTabBar');
  //   if (tabBar.style.display !== 'none') tabBar.style.display = 'none';
  // }
  // private showTabs() {
  //   const tabBar = document.getElementById('myTabBar');
  //   if (tabBar.style.display !== 'flex') tabBar.style.display = 'flex';
  // }

  // private validateURL(event: NavigationEnd) {
  //   return event.url && (event.url.indexOf('order/') !== -1
  //     || event.url.indexOf('login') !== -1
  //     || event.url.indexOf('register') !== -1);
  // }
}
