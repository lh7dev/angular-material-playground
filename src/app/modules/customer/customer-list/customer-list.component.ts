import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ListView } from 'src/app/shared/Abstracts/entity-list.class';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent extends ListView implements OnInit, AfterViewInit {

  desktopDisplayedColumns = ["select", 'number', 'name', 'status'];
  handsetDisplayedColumns = this.desktopDisplayedColumns;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private service: CustomerService, bpo: BreakpointObserver) {
    super(service, bpo);
  }

  ngOnInit(): void {
    this.refreshList();
  }

  ngAfterViewInit() {
    this.initPaginators();
  }
}
