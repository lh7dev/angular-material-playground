import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityView } from 'src/app/shared/Abstracts/entity-view.class';
import { iEntityListView, Entity } from 'src/app/shared/Abstracts/shared.interfaces';
import { ProductListComponent } from './product-list/product-list.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent extends EntityView implements OnInit {

  title: string = 'Products & Services';

  dialogDelete: any;

  dialogDetails: any;

  dialogEdit: any;

  dialogNew: any;

  @ViewChild('List', { static: true }) listRef: ProductListComponent;

  onSelect() {
    throw new Error("Method not implemented.");
  }

  onNew(): void {
    throw new Error('Method not implemented.');
  }

  onDelete() {
    throw new Error('Method not implemented.');
  }

  onOpenEdit(e: Entity) {
    throw new Error("Method not implemented.");
  }

  constructor(private dialog: MatDialog) {
    super(dialog);
  }

  ngOnInit(): void {}
}
