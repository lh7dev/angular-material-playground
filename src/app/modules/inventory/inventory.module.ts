import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Material
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

// app modules
import { InventoryRoutingModule } from './inventory-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
// app components
import { InventoryComponent } from './inventory.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryService } from '../inventory.service';
import { InventoryNewComponent } from './inventory-new/inventory-new.component';
import { InventoryEditComponent } from './inventory-edit/inventory-edit.component';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';


@NgModule({
  declarations: [InventoryComponent, InventoryListComponent, InventoryNewComponent, InventoryEditComponent, InventoryDetailsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    InventoryRoutingModule,
    SharedModule,
    // material
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
  ],
  providers: [
    InventoryService
  ]
})
export class InventoryModule { }
