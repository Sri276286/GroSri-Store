import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './store/dashboard/dashboard.page';
import { OrdersPage } from './store/orders/orders.page';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPage
  },
  {
    path: 'order/:id',
    component: OrdersPage
  },
  {
    path: '',
    redirectTo: 'dashboard',
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
