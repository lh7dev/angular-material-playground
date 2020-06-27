import { Component, OnInit, Inject } from '@angular/core';
import { Entity, Contact } from 'src/app/shared/Abstracts/shared.interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from '../customer.service';
import { Customer } from 'src/app/shared/Abstracts/customer.interface';
import { NextAction } from 'src/app/shared/Abstracts/entity-view.class';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit {
  entity: Customer | null;

  private loading: boolean = true;

  contacts: Contact[] = [];

  constructor(
    private service: CustomerService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Entity
  ) {}

  ngOnInit(): void {
    this.entity = <Customer>this.data;
    this.refreshData();
  }

  refreshData(): void {
    this.loading = true;
    this.service.getDetails({ id: this.data.id }).subscribe((result) => {
      if (result.success == true) {
        this.entity = <Customer>result.data[0];
        this.contacts = this.entity.contacts;
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
