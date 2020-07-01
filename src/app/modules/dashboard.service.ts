import { Injectable } from '@angular/core';
import { CardData } from '../shared/widgets/card/card.component';
import {
  TableWidgetData,
  PeriodicElement,
} from '../shared/widgets/table/table.component';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor() {}

  bigChart() {
    return __BIG_CHART_DATA__;
  }

  cardData(): CardData[] {
    return __CARD_DATA__;
  }

  pieChart() {
    return __PIE_DATA__;
  }

  tableData(): TableWidgetData {
    console.log(__TABLE_DATA__);
    return __TABLE_DATA__;
  }
}

const __BIG_CHART_DATA__ = [
  {
    name: 'This Week',
    data: [502, 635, 809, 947, 1402, 3634, 5268],
  },
  {
    name: 'Previous Week',
    data: [106, 107, 111, 133, 221, 767, 1766],
  },
];

const __CARD_DATA__ = [
  {
    label: 'New Users',
    total: '12k',
    percentage: '50',
    chartData: [71, 78, 39, 66, 88, 66, 88],
  },
  {
    label: 'Users retention',
    total: '10k',
    percentage: '50',
    chartData: [71, 78, 39, 66, 88, 66, 88],
  },
  {
    label: 'Users Engagement',
    total: '8k',
    percentage: '50',
    chartData: [71, 78, 39, 66, 88, 66, 88],
  },
  {
    label: 'Referrals',
    total: '6k',
    percentage: '20',
    chartData: [71, 78, 39, 66, 88, 66, 88],
  },
];

const __PIE_DATA__ = [
  {
    name: 'Chrome',
    y: 61.41,
    sliced: true,
    selected: true,
  },
  {
    name: 'Internet Explorer',
    y: 11.84,
  },
  {
    name: 'Firefox',
    y: 10.85,
  },
  {
    name: 'Edge',
    y: 4.67,
  },
  {
    name: 'Safari',
    y: 4.18,
  },
  {
    name: 'Sogou Explorer',
    y: 1.64,
  },
  {
    name: 'Opera',
    y: 1.6,
  },
  {
    name: 'QQ',
    y: 1.2,
  },
  {
    name: 'Other',
    y: 2.61,
  },
];

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

const __COLUMNS = (colNames: string[]) => {
  let cols = colNames.map((x) => {
    return { displayedColumnName: x, displayedColumnText: x + '.' };
  });
  return cols;
};

const __DISPLAY_COLUMNS__ = ['position', 'name', 'weight', 'symbol'];

const __TABLE_DATA__: TableWidgetData = {
  columns: __COLUMNS(__DISPLAY_COLUMNS__),
  displayedColumns: __DISPLAY_COLUMNS__,
  dataSource: new MatTableDataSource(ELEMENT_DATA),
};
