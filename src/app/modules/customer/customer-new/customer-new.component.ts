import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CustomerService } from '../customer.service';
import { EntityNew } from 'src/app/shared/Abstracts/entity-new.class';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { NewCustomerFormData, Customer } from 'src/app/shared/Abstracts/customer.interface';

@Component({
  selector: 'lh7-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.scss'],
})
export class CustomerNewComponent extends EntityNew implements OnInit {

  controlsConfig: any;

  constructor(
    private custService: CustomerService,
    public dialogRef: MatDialogRef<CustomerNewComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: object,
    public fb: FormBuilder
  ) {
    super(custService, dialogRef, fb);
  }

  ngOnInit() {
    this.controlsConfig = {
      name: ['', [Validators.required, Validators.minLength(3)]],
      status: ['active', Validators.required],
      country: ['us', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern("^[0-9]{5}(?:-[0-9]{4})?$")]],
      contactName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^\\d{10}$")]],
      email: ['', [Validators.required, Validators.email]]
    };
    this.initForm(this.controlsConfig);
  }

  formatData(fd: NewCustomerFormData):Customer {
    var mainContact = {
      name: fd.contactName,
      email: fd.email,
      phone: fd.phone
    };

    var businessAddress = {
      country: fd.country,
      address_line_1: fd.address1,
      address_line_2: fd.address2,
      city: fd.city,
      state: fd.state,
      zipcode: fd.zipcode
    };

    return {
      id: null,
      number: null,
      name: fd.name,
      status: fd.status,
      address: businessAddress,
      default_contact: mainContact,
      contacts:[mainContact]
    };
  }
}
