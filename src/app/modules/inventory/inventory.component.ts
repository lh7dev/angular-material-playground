import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityView } from 'src/app/shared/Abstracts/entity-view.class';
import { iEntityListView } from 'src/app/shared/Abstracts/shared.interfaces';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent extends EntityView implements OnInit {
  dialogDelete: any;
  dialogDetails: any;
  dialogEdit: any;
  onSelect() {
    throw new Error("Method not implemented.");
  }
  dialogNew: any;
  @ViewChild('List', { static: true }) listRef: InventoryListComponent;

  title: string = 'Inventory';

  constructor(private dialog:MatDialog) {
    super(dialog);
  }

  onNew(): void {
    throw new Error('Method not implemented.');
  }

  onDelete() {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {}
}
