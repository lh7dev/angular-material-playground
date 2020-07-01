import { Component, OnInit } from '@angular/core';
import { CardData } from 'src/app/shared/widgets/card/card.component';
import { DashboardService } from '../dashboard.service';
import { TableWidgetData } from 'src/app/shared/widgets/table/table.component';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
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

  private tilesBigScreen: Tile[] = TILES_BIG_SCREEN;
  private tilesHandset: Tile[] = TILES_HANDSET_SCREEN;
  private tilesXSScreen: Tile[] = TILES_XS_SCREEN;

  private loading: boolean = true;

  isHandset$: Observable<boolean> = this.bpo
    .observe([Breakpoints.Handset, Breakpoints.Small])
    .pipe(map((result) => result.matches));

  isXSmall$: Observable<boolean> = this.bpo
    .observe(Breakpoints.XSmall)
    .pipe(map((result) => result.matches));

  isSmall$: Observable<boolean> = this.bpo
    .observe(Breakpoints.Small)
    .pipe(map((result) => result.matches));

  currentLyout: Tile[] | null;

  constructor(
    private service: DashboardService,
    private bpo: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.setLayout();
    this.widgetCards = this.service.cardData();
    this.pieWidgetData = this.service.pieChart();
    this.tableWidgetData = this.service.tableData();
    console.log('current layout');
    this.TileLayout.subscribe((result) => {
      this.currentLyout = result;
      console.log(this.currentLyout);
      this.loading = false;
      console.log(this.loading);
    });

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

  get isLoading(): boolean {
    return this.loading;
  }

  get BigChartData(): object[] {
    return this.service.bigChart();
  }

  private setLayout() {
    this.TileLayout.subscribe((result) => {
      this.currentLyout = result;
    });
  }

  get TileLayout(): Observable<Tile[]> {
    console.log('xSmall: ' + this.isXSmall$);
    console.log('Medium: ' + this.isHandset$);
    return new Observable<Tile[]>((observer) => {
      switch (this.screenBreakPoint) {
        case 'XSmall':
          console.log('xs-screen');
          observer.next(this.tilesXSScreen);
          break;
        case 'Medium':
          console.log('medium-screen');
          observer.next(this.tilesHandset);
          break;
        default:
          console.log('big-screen');
          observer.next(this.tilesBigScreen);
          break;
      }
    });
  }
  get screenBreakPoint() {
    if (this.bpo.isMatched(Breakpoints.Medium)) {
      return 'Medium';
    } else if (this.bpo.isMatched([Breakpoints.XSmall, Breakpoints.Small])) {
      return 'XSmall';
    } else {
      return 'Big';
    }
  }
}

export interface Tile {
  cols: number;
  rows: number;
}

const TILES_BIG_SCREEN: Tile[] = [
  { cols: 4, rows: 2 },
  { cols: 1, rows: 1 },
  { cols: 1, rows: 1 },
  { cols: 1, rows: 1 },
  { cols: 1, rows: 1 },
  { cols: 2, rows: 3 },
  { cols: 2, rows: 3 },
];

const TILES_HANDSET_SCREEN: Tile[] = [
  { cols: 4, rows: 2 },
  { cols: 2, rows: 1 },
  { cols: 2, rows: 1 },
  { cols: 2, rows: 1 },
  { cols: 2, rows: 1 },
  { cols: 2, rows: 3 },
  { cols: 2, rows: 3 },
];

const TILES_XS_SCREEN: Tile[] = [
  { cols: 4, rows: 2 },
  { cols: 4, rows: 1 },
  { cols: 4, rows: 1 },
  { cols: 4, rows: 1 },
  { cols: 4, rows: 1 },
  { cols: 4, rows: 3 },
  { cols: 4, rows: 3 },
];
