import { Component, OnInit } from '@angular/core';
import { CardData } from 'src/app/shared/widgets/card/card.component';
import { DashboardService } from '../dashboard.service';
import { TableWidgetData } from 'src/app/shared/widgets/table/table.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  widgetCards: CardData[];
  pieWidgetData = [];
  tableWidgetData: TableWidgetData;

  isHandset$: Observable<boolean> = this.bpo
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  constructor(private service: DashboardService, private bpo: BreakpointObserver) {}

  ngOnInit(): void {
    this.widgetCards = this.service.cardData();
    this.pieWidgetData = this.service.pieChart();
    this.tableWidgetData = this.service.tableData();
  }

  get BigChartData(): object[] {
    return this.service.bigChart();
  }
}
