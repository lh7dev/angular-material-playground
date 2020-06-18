import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Material
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

// app modules
import { InventoryRoutingModule } from './inventory-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
// app components
import { InventoryComponent } from './inventory.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryService } from '../inventory.service';


@NgModule({
  declarations: [InventoryComponent, InventoryListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    InventoryRoutingModule,
    SharedModule,
    // material
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ],
  providers: [
    InventoryService
  ]
})
export class InventoryModule { }
