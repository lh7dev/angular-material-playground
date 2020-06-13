import { Component, OnInit } from '@angular/core';
import { CardData } from 'src/app/shared/widgets/card/card.component';
import { DashboardService } from '../dashboard.service';
import { TableWidgetData } from 'src/app/shared/widgets/table/table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  widgetCards: CardData[];
  pieWidgetData = [];
  tableWidgetData: TableWidgetData;

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.widgetCards = this.service.cardData();
    this.pieWidgetData = this.service.pieChart();
    this.tableWidgetData = this.service.tableData();
  }

  get BigChartData(): object[] {
    return this.service.bigChart();
  }
}
