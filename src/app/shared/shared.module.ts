import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

// material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
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

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    TableComponent,
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
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatToolbarModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    TableComponent
  ],
})
export class SharedModule {}
