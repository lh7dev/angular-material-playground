import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout';
// Material
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';

// app modules
import { SharedModule } from 'src/app/shared/shared.module';

// app components
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';

// app services
import { DashboardService } from 'src/app/modules/dashboard.service';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    // FlexLayout
    FlexLayoutModule,
    // Materials
    MatCardModule,
    MatDividerModule,
    MatSidenavModule,
  ],
  providers: [
    DashboardService
  ],
  exports: [],
})
export class DefaultModule {}
