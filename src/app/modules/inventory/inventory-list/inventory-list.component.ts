import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { EntityView } from 'src/app/shared/Abstracts/entity-view.class';
import { ListView } from 'src/app/shared/Abstracts/entity-list.class';
import { InventoryService } from '../../inventory.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
})
export class InventoryListComponent extends ListView implements OnInit, AfterViewInit {

  handsetDisplayedColumns = ['select', "product", "status", "inStock"];
  desktopDisplayedColumns = ['select', "product", "sku", "status", "inStock"];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private service: InventoryService, private bpo: BreakpointObserver) {
    super(service, bpo);
  }

  ngOnInit(): void {
    this.refreshList();
  }

  ngAfterViewInit():void {
    this.initPaginators()
  }
}
