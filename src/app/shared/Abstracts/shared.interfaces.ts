import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

export interface Address {
  country: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface Entity {
  id: string;
  name?: string;
}

export interface Contact {
  name: string;
  email: string;
  phone: string;
}

export interface EntityListData {
  data: Entity[];
  total: number;
}

export interface ApiResponse {
  error?: object;
  success: boolean;
  message?: string;
  data?: any;
}

export interface Cancelable {
  cancel();
}

export interface Creable {
  create();
}

export interface Updateable {
  update();
}

export interface Deletable {
  delete();
}

export interface iEntityListView {
  // table fields
  dataSource: MatTableDataSource<Entity>;
  handsetDisplayedColumns: string[];
  desktopDisplayedColumns: string[];

  selection: SelectionModel<Entity>;

  // paginator fields
  length: number;
  pageIndex: number;
  pageSize: number;
  pageSizeOptions: number[];
  pageEvent: PageEvent;

  refreshList():void;
}

export interface iEntityService {
  getList(): Observable<ApiResponse>;
  getDetails(entity: Entity): Observable<ApiResponse>;
  getNew(): Observable<ApiResponse>;
  applyNew(object): Observable<ApiResponse>;
  applyEdit(entity: Entity): Observable<ApiResponse>;
  delete(entities: Entity[]): Observable<ApiResponse>;
  notify(msg: string, delay?: number)
}

export interface GenericEndpoints {
  list?: string;
  details?: string;
  openEdit?: string;
  applyEdit?: string;
  applyNew?: string;
  delete?: string;
}
