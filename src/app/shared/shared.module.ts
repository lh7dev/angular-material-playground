import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

// material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

// Highcharts
import { HighchartsChartModule } from 'highcharts-angular';

// app
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AreaComponent } from './widgets/area/area.component';
import { CardComponent } from './widgets/card/card.component';
import { PieComponent } from './widgets/pie/pie.component';
import { TableComponent } from './widgets/table/table.component';
import { EntityToolbarComponent } from './components/entity-toolbar/entity-toolbar.component';
import { AuthService } from './services/auth.service';
import { DummyDataService } from './testing/dummy-data.service';
import { DeleteViewComponent } from './components/delete-view/delete-view.component';
import { EntityService } from './Abstracts/entity-service.class';
import { PhonePipe } from './directives/phone-pipe.directive';
import { ViewStateService } from './services/view-state.service';
import { BusinessService } from './services/business.service';
import { AddressFormatComponent } from './components/address-format/address-format.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    TableComponent,
    EntityToolbarComponent,
    DeleteViewComponent,
    PhonePipe,
    AddressFormatComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    // FlexLyout
    FlexLayoutModule,
    // HighCharts
    HighchartsChartModule,
    // Material
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    TableComponent,
    EntityToolbarComponent,
    DeleteViewComponent,
    PhonePipe,
    AddressFormatComponent
  ],

  providers: [AuthService, DummyDataService, ViewStateService, BusinessService],
})
export class SharedModule {}
