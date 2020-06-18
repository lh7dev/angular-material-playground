import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-widget-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() tableData: TableWidgetData;

  constructor() {}

  ngOnInit(): void {
  }

}

export interface TableWidgetData {
  columns: ViewColumn[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<PeriodicElement>;
}

export interface ViewColumn {
  displayedColumnName: string;
  displayedColumnText: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
