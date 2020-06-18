import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { EntityView } from 'src/app/shared/Abstracts/entity-view.class';
import { ListView } from 'src/app/shared/Abstracts/entity-list.class';
import { InventoryService } from '../../inventory.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
})
export class InventoryListComponent extends ListView implements OnInit, AfterViewInit {

  displayedColumns = ['select', "product", "sku", "status", "inStock"];

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private service: InventoryService) {
    super(service);
  }

  ngOnInit(): void {
    this.refreshList();
  }

  ngAfterViewInit():void {
    this.initPaginators()
  }
}
