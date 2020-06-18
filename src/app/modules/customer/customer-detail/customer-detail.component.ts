import { Component, OnInit, Inject } from '@angular/core';
import { Entity, Contact } from 'src/app/shared/Abstracts/shared.interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntityDetails } from 'src/app/shared/Abstracts/entity-details.class';
import { CustomerService } from '../customer.service';
import { Customer } from 'src/app/shared/Abstracts/customer.interface';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent extends EntityDetails implements OnInit {
  detailsComponent: any;

  contacts: Contact[] | null;

  constructor(
    private cutomerService: CustomerService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Entity
  ) {
    super(cutomerService, dialogRef, data);
  }

  ngOnInit(): void {
    console.log("trace ngOnInit");
    this.setEntity(this.data);
    console.log(this.entity);
    console.log(<Customer>this.entity);

    const customer: Customer = <Customer> this.entity;
    this.contacts = customer.contacts;
  }

}
