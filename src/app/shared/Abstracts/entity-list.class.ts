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

export abstract class ListView implements iEntityListView {
  dataSource: MatTableDataSource<Entity>;
  abstract displayedColumns: string[];
  selection: SelectionModel<Entity>;

  length: number = 0; // ← used in the template
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [10, 25, 50, 100, 1000];
  pageEvent: PageEvent;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  abstract sort: MatSort;

  @Output() itemSelected: EventEmitter<any> = new EventEmitter();
  @Output() selectionChanged: EventEmitter<any> = new EventEmitter();

  constructor(private entityService: iEntityService) {}

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
      row._id
    }`;
  }

  selectItem(item: Entity) {
    this.itemSelected.emit(item);
  }

  refreshList(): void {
    console.log("refreshing list");
    this.entityService.getList().subscribe((response) => {
      console.log("list response");
      console.log(response);
      if (response.success) {
        this.dataSource = new MatTableDataSource<Entity>(
          response.data.data
        );

        this.selection = new SelectionModel<Entity>(true, []);

        this.length = this.dataSource.data.length;

        this.selection.changed.subscribe(res=>{
          this.selectionChanged.emit(res.source.selected);
        });
      } else {
        console.log('refresh list failed');
        console.log(response);
      }

    });
  }

  initPaginators() {
    this.paginator.pageSize = this.pageSize;
    this.paginator.pageIndex = this.pageIndex;
    this.dataSource.paginator = this.paginator;
    this.sort.start = 'asc';
    this.dataSource.sort = this.sort;
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
}
