import { Component, OnInit, Inject } from '@angular/core';
import { Entity, Contact } from 'src/app/shared/Abstracts/shared.interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '../order.service';
import { Order, Charge } from 'src/app/shared/Abstracts/order.interface';
import { NextAction } from 'src/app/shared/Abstracts/entity-view.class';
import { Customer } from 'src/app/shared/Abstracts/customer.interface';
import { Business } from 'src/app/shared/Abstracts/business.interface';
import { BusinessService } from 'src/app/shared/services/business.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})

export class OrderDetailsComponent implements OnInit {
  entity: Order | null;
  customer: Customer | null;
  business: Business | null;
  charges: Charge[] | null;

  displayedColumns = ["product_name", "count", "unit_price", "total"];

  private loading: boolean = true;

  constructor(
    private service: OrderService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Entity
  ) {}

  ngOnInit(): void {
    this.entity = <Order>this.data;
    this.refreshData();
  }

  refreshData(): void {
    this.loading = true;
    this.service.getDetails({ id: this.data.id }).subscribe((result) => {
      if (result.success == true) {
        this.entity = <Order>result.data[0];
        this.business = this.entity.business;
        this.charges = this.entity.charges;
        this.customer = this.entity.customer;
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

  //public abstract editItem(): void; // ← close, then open edit component | trigger stub.

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
