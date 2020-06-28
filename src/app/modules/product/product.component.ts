import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityView, NextAction } from 'src/app/shared/Abstracts/entity-view.class';
import { iEntityListView, Entity } from 'src/app/shared/Abstracts/shared.interfaces';
import { ProductListComponent } from './product-list/product-list.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteViewComponent, iDeleteData, iDeleteChoice } from 'src/app/shared/components/delete-view/delete-view.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent extends EntityView implements OnInit {

  title: string = 'Products';

  dialogDelete = DeleteViewComponent;
  dialogDetails = ProductDetailsComponent;
  dialogEdit = ProductEditComponent;
  dialogNew = ProductNewComponent;

  @ViewChild('List', { static: true }) listRef: ProductListComponent;

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
    var entityRefText = this.entityRefText('product', 'products');
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
      const text = this.entityRefText('product', 'products');
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
    console.log("test");
    const dialogRef = this.dialog.open(this.dialogDetails, {
      width: '400px',
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

  onOpenEdit(e: Entity) {
    const dialogRef = this.dialog.open(this.dialogEdit, {
      width: '400px',
      autoFocus: false,
      data: e,
    });

    dialogRef.afterClosed().subscribe((result: NextAction) => {
      console.log(result);
      switch (result.next) {
        case 'open-details':
          this.onSelect(result.entity);
          break;
        default:
          this.listRef.refreshList();
          break;
      }
    });
  }

  constructor(private dialog: MatDialog, private service: ProductService) {
    super(dialog);
  }
  
  ngOnInit(): void {}
}
