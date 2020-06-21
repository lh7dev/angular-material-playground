import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityView } from 'src/app/shared/Abstracts/entity-view.class';
import { iEntityListView, Entity } from 'src/app/shared/Abstracts/shared.interfaces';
import { OrderNewComponent } from './order-new/order-new.component';
import { DeleteViewComponent } from 'src/app/shared/components/delete-view/delete-view.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderService } from './order.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent extends EntityView implements OnInit {
  title: string = "Orders";

  dialogNew: OrderNewComponent;
  dialogDelete: DeleteViewComponent;
  dialogDetails: OrderDetailsComponent;
  dialogEdit: OrderEditComponent;

  @ViewChild('List', { static: true }) listRef: OrderListComponent;

  onNew(): void {
    throw new Error("Method not implemented.");
  }
  onDelete() {
    throw new Error("Method not implemented.");
  }
  onSelect(e: Entity) {
    throw new Error("Method not implemented.");
  }

  constructor(private dialog: MatDialog, private service: OrderService) {
    super(dialog);
  }

  ngOnInit(): void {
  }

}
