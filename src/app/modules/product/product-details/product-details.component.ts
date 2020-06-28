import { Component, OnInit, Inject } from '@angular/core';
import { Product } from 'src/app/shared/Abstracts/product.interface';
import { ProductService } from '../product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Entity } from 'src/app/shared/Abstracts/shared.interfaces';
import { NextAction } from 'src/app/shared/Abstracts/entity-view.class';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  entity: Product | null;

  private loading: boolean = true;

  constructor(
    private service: ProductService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Entity
  ) {}

  ngOnInit(): void {
    this.entity = this.data as Product;
    this.refreshData();
  }

  refreshData(): void {
    this.loading = true;
    this.service.getDetails({ id: this.data.id }).subscribe((result) => {
      if (result.success === true) {
        this.entity = result.data[0] as Product;
        this.loading = false;

      } else {
        this.service.notify('ERROR: could not reach the server');
        this.loading = false;
        this.dialogRef.close();
      }
    });
  }

  dialogClose(): void {
    const next: NextAction = {
      next: null,
    };

    this.dialogRef.close(next);
  }

  openEdit(): void {
    const next: NextAction = {
      next: 'open-edit',
      entity: this.entity,
    };

    this.dialogRef.close(next);
  }

  get isLoading(): boolean {
    return this.loading;
  }
}
