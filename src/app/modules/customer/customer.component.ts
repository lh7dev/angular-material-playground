import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityView, NextAction } from 'src/app/shared/Abstracts/entity-view.class';
import { MatDialog } from '@angular/material/dialog';
import { CustomerNewComponent } from './customer-new/customer-new.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import {
  DeleteViewComponent,
  iDeleteChoice,
  iDeleteData,
} from 'src/app/shared/components/delete-view/delete-view.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerService } from './customer.service';
import { ThrowStmt } from '@angular/compiler';
import { Entity } from 'src/app/shared/Abstracts/shared.interfaces';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent extends EntityView implements OnInit {
  title: string = 'Customer';

  dialogNew = CustomerNewComponent;
  dialogDelete = DeleteViewComponent;
  dialogDetails = CustomerDetailComponent;
  dialogEdit = CustomerEditComponent;

  @ViewChild('List', { static: true }) listRef: CustomerListComponent;

  constructor(private dialog: MatDialog, private service: CustomerService) {
    super(dialog);
  }

  ngOnInit(): void {}

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
    var entityRefText = this.entityRefText('customer', 'customers');
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
      const text = this.entityRefText('customer', 'customers');
      const inputData: iDeleteData = { entityRefText: text, count: count };
      const dialogRef = this.dialog.open(this.dialogDelete, {
        width: '400px',
        autoFocus: false,
        data: inputData,
      });

      dialogRef.afterClosed().subscribe((result: iDeleteChoice) => {
        console.log(result);
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
      width: '400px',
      autoFocus: false,
      disableClose: true,
      data: e,
    });

    dialogRef
      .afterClosed()
      .subscribe((result: NextAction) => {
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
}
