import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CustomerModule } from './modules/customer/customer.module';
import { ProductModule } from './modules/product/product.module';
import { SettingsModule } from './modules/settings/settings.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { OrderModule } from './modules/order/order.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { PaymentModule } from './modules/payment/payment.module';
import { UserModule } from './modules/user/user.module';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },

      {
        path: 'customers',
        loadChildren: './modules/customer/customer.module#CustomerModule',
      },

      {
        path: 'products',
        loadChildren: './modules/product/product.module#ProductModule',
      },
      {
        path: 'inventory',
        loadChildren: './modules/inventory/inventory.module#InventoryModule',
      },
      {
        path: 'orders',
        loadChildren: './modules/order/order.module#OrderModule',
      },
      {
        path: 'invoices',
        loadChildren: './modules/invoice/invoice.module#InvoiceModule',
      },
      {
        path: 'payments',
        loadChildren: './modules/payment/payment.module#PaymentModule',
      },
      {
        path: 'users',
        loadChildren: './modules/user/user.module#UserModule',
      },
      {
        path: 'settings',
        loadChildren: './modules/settings/settings.module#SettingsModule',
      }
    ],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
