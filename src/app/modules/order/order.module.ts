import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

// App Modules
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// App Components
import { OrderComponent } from './order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderNewComponent } from './order-new/order-new.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { DeleteViewComponent } from 'src/app/shared/components/delete-view/delete-view.component';
import { OrderService } from './order.service';


@NgModule({
  declarations: [OrderComponent, OrderListComponent, OrderNewComponent, OrderEditComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // Material Modules
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    // App Modules
    SharedModule
  ],
  providers: [OrderService],
  entryComponents: [
    OrderNewComponent,
    DeleteViewComponent,
    OrderDetailsComponent,
    OrderEditComponent
  ]
})
export class OrderModule { }
