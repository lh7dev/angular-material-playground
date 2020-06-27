import {
  iEntityListView,
  EntityListData,
  Entity,
  iEntityService,
} from './shared.interfaces';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

export abstract class ListView {
  dataSource: MatTableDataSource<Entity> = new MatTableDataSource([]);
  private displayedColumns: string[];
  abstract handsetDisplayedColumns: string[];
  abstract desktopDisplayedColumns: string[];

  selection: SelectionModel<Entity> = new SelectionModel<Entity>(true, []);

  length: number = 0; // ← used in the template
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [10, 25, 50, 100, 1000];
  pageEvent: PageEvent;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  abstract sort: MatSort;

  @Output() itemSelected: EventEmitter<any> = new EventEmitter();
  @Output() selectionChanged: EventEmitter<any> = new EventEmitter();

  private loading: boolean = true;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  constructor(
    private entityService: iEntityService,
    private breakpointObserver: BreakpointObserver
  ) {

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
    //this.itemSelectionChange();
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Entity): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id
    }`;
  }

  selectItem(item: Entity) {
    this.itemSelected.emit(item);
  }

  refreshList(): void {
    this.loading = true;

    this.entityService.getList().subscribe((result) => {
      console.log('list response');
      console.log(result);
      if (result.success) {
        this.dataSource = new MatTableDataSource<Entity>(result.data.data);
        this.loading = false;
        this.setDisplayedColumns();
        this.initSelectionModel();
        this.initPaginators();
      } else {
        console.log('refresh list failed');
        console.log(result);
      }
    });
  }

  get isLoading(): boolean {
    return this.loading;
  }

  //must be called after view inits
  initSelectionModel(): void {
    this.length = this.dataSource.data.length;

    this.selection.changed.subscribe((res) => {
      this.selectionChanged.emit(res.source.selected);
    });
  }

  initPaginators() {
    this.paginator.pageSize = this.pageSize;
    this.paginator.pageIndex = this.pageIndex;
    this.dataSource.paginator = this.paginator;
    this.sort.start = 'asc';
    this.dataSource.sort = this.sort;
    // end loading
    console.log(this.loading);
  }

  searchFor(searchArg: string) {
    let filter = searchArg.trim();
    filter = filter.toLowerCase();
    this.dataSource.filter = filter;
  }

  onPageChange(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
  }

  get DisplayedColumns(): string[] {
    return this.displayedColumns;
  }

  private setDisplayedColumns() {
    return this.isHandset$.subscribe((isHandset) => {
      if (isHandset) {
        this.displayedColumns = this.handsetDisplayedColumns;
      } else {
        this.displayedColumns = this.desktopDisplayedColumns;
      }
    });
  }
}
