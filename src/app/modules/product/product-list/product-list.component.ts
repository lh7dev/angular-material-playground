import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';

import { ListView } from 'src/app/shared/Abstracts/entity-list.class';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends ListView implements OnInit, AfterViewInit {

  displayedColumns = ["select", 'name', 'sku', 'status', 'type', 'price'];

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private service: ProductService) {
    super(service)
  }

  ngOnInit(): void {
    this.refreshList();
  }

  ngAfterViewInit() {
    this.initPaginators();
  }
}
