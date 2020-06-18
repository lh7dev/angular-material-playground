import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ListView } from 'src/app/shared/Abstracts/entity-list.class';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent extends ListView implements OnInit, AfterViewInit {

  displayedColumns: string[] = ["select", 'number', 'name', 'status'];

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private service: CustomerService) {
    super(service);
  }

  ngOnInit(): void {
    this.refreshList();
  }

  ngAfterViewInit() {
    this.initPaginators();
  }
}
