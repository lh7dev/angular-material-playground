import { Component, OnInit, ViewChild } from '@angular/core';
import {
  EntityView,
  NextAction,
} from 'src/app/shared/Abstracts/entity-view.class';
import {
  Entity
} from 'src/app/shared/Abstracts/shared.interfaces';
import { OrderNewComponent } from './order-new/order-new.component';
import {
  DeleteViewComponent,
  iDeleteData,
  iDeleteChoice,
} from 'src/app/shared/components/delete-view/delete-view.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderService } from './order.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent extends EntityView implements OnInit {
  title: string = 'Orders';

  dialogNew = OrderNewComponent;
  dialogDelete = DeleteViewComponent;
  dialogDetails = OrderDetailsComponent;
  dialogEdit = OrderEditComponent;

  @ViewChild('List', { static: true }) listRef: OrderListComponent;

  constructor(private dialog: MatDialog, private service: OrderService) {
    super(dialog);
  }

  onNew() {
    const dialogRef = this.dialog.open(this.dialogNew, {
      width: '400px',
      disableClose: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.listRef.refreshList();
    });
  }

  private confirmDelete() {
    var count = this.checkedItems.length;
    var entityRefText = this.entityRefText('order', 'order');
    if (count > 0) {
      try {
        this.service.delete(this.checkedItems).subscribe((result) => {
          if (result.success) {
            this.service.notify(
              `A total of ${count} ${entityRefText} have been deleted`
            );
            this.listRef.refreshList();
          } else {
            this.service.notify(`${count} could not be deleted`);
          }
        });
      } catch (e) {
        console.log('Action not implemented');
        this.service.notify('Action not implemented');
      }
    } else {
      this.service.notify('nothing to delete');
    }
  }

  onDelete() {
    const count = this.checkedItems.length;
    if (count > 0) {
      const text = this.entityRefText('order', 'orders');
      const inputData: iDeleteData = { entityRefText: text, count: count };
      const dialogRef = this.dialog.open(this.dialogDelete, {
        width: '400px',
        autoFocus: false,
        data: inputData,
      });

      dialogRef.afterClosed().subscribe((result: iDeleteChoice) => {
        if (result.userConfirmed == true) {
          this.confirmDelete();
        }
      });
    } else {
      this.service.notify('no item selected');
    }
  }

  onSelect(e: Entity) {
    const dialogRef = this.dialog.open(this.dialogDetails, {
      width: '800px',
      autoFocus: false,
      disableClose: true,
      data: e,
    });

    dialogRef.afterClosed().subscribe((result: NextAction) => {
      console.log(result);
      switch (result.next) {
        case 'open-edit':
          this.onOpenEdit(result.entity);
          break;
        default:
          this.listRef.refreshList();
          break;
      }
    });
  }

  ngOnInit(): void {}
}
