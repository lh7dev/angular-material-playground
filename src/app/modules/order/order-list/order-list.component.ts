import { Component, OnInit, ViewChild } from '@angular/core';
import { iEntityListView } from 'src/app/shared/Abstracts/shared.interfaces';
import { ListView } from 'src/app/shared/Abstracts/entity-list.class';
import { MatSort } from '@angular/material/sort';
import { OrderService } from '../order.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent extends ListView implements OnInit {

  desktopDisplayedColumns = ["select", 'number', 'customer', 'status', 'created_on', 'total'];
  handsetDisplayedColumns = this.desktopDisplayedColumns;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private service: OrderService, bpo: BreakpointObserver) {
    super(service, bpo);
  }

  ngOnInit(): void {
    this.refreshList();
  }

  ngAfterViewInit() {
    this.initPaginators();
  }
}
