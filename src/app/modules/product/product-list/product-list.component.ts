import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Input,
} from '@angular/core';

import { ListView } from 'src/app/shared/Abstracts/entity-list.class';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../product.service';
import { MatPaginator } from '@angular/material/paginator';
import { BreakpointObserver } from '@angular/cdk/layout';
import { iEntityListView } from 'src/app/shared/Abstracts/shared.interfaces';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent extends ListView
  implements iEntityListView, OnInit, AfterViewInit {
  desktopDisplayedColumns = ['select', 'name', 'sku', 'status', 'type', 'price'];
  handsetDisplayedColumns = ['select', 'name', 'type'];

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private service: ProductService, private bps: BreakpointObserver) {
    super(service, bps);
  }

  ngOnInit(): void {
    this.refreshList();
  }

  ngAfterViewInit() {}
}
