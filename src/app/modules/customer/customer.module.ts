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

//App Modules
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// App Components
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerComponent } from './customer.component';
import { DeleteViewComponent } from 'src/app/shared/components/delete-view/delete-view.component';

// App Services
import { CustomerService } from './customer.service';
import { CustomerNewComponent } from './customer-new/customer-new.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerDetailsContactComponent } from './customer-details-contact/customer-details-contact.component';

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerComponent,
    CustomerNewComponent,
    CustomerDetailComponent,
    CustomerEditComponent,
    CustomerDetailsContactComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
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
  providers: [
    CustomerService
  ],
  entryComponents: [
    CustomerNewComponent,
    DeleteViewComponent,
    CustomerDetailComponent,
    CustomerEditComponent
  ]
})
export class CustomerModule { }
