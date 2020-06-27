import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './store/dashboard/dashboard.page';
import { OrdersPage } from './store/orders/orders.page';
import { LoginPage } from './store/login/login.page';
import { SignupPage } from './store/signup/signup.page';
import { PastOrdersPage } from './store/past-orders/past-orders.page';
import { MenuPage } from './store/menu/menu.page';
import { BusinessPage } from './store/business/business.page';
import { TabsPage } from './store/tabs/tabs.page';
import { AuthGuard } from './guards/auth.guard';
import { ProfilePage } from './store/profile/profile.page';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'register',
    component: SignupPage
  },
  {
    path: 'order/:id',
    component: OrdersPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfilePage,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        component: DashboardPage
      },
      {
        path: 'past-orders',
        component: PastOrdersPage
      },
      {
        path: 'menu',
        component: MenuPage
      },
      {
        path: 'business',
        component: BusinessPage
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
