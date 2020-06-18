import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './product.service';
import { SharedModule } from 'src/app/shared/shared.module';
//Material Modules
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [ProductComponent, ProductListComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    HttpClientModule,
    SharedModule,
    // Material
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
