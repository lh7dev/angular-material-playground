import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/shared/Abstracts/shared.interfaces';
import { CustomerService } from '../customer.service';
import {
  Customer,
  EditCustomerFormData,
} from 'src/app/shared/Abstracts/customer.interface';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NextAction } from 'src/app/shared/Abstracts/entity-view.class';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss'],
})

export class CustomerEditComponent implements OnInit {
  entity: Customer | null;
  form: FormGroup = new FormGroup({});
  contactForm: FormGroup = new FormGroup({});
  contacts: Contact[] | null;
  defaultContact: Contact | null;

  private loading: boolean = true;

  constructor(
    private service: CustomerService,
    private ref: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Customer
  ) {
    console.log(this.entity);
  }

  ngOnInit(): void {
    this.entity = this.data;
    this.contacts = this.data.contacts;
    this.defaultContact = this.data.default_contact;
    this.refreshData();
  }

  initForm() {
    const mainIfoFormControls = {
      name: [this.entity.name, [Validators.required, Validators.minLength(3)]],
      status: [this.entity.status, Validators.required],
      country: [this.entity.address.country, Validators.required],
      address1: [this.entity.address.address_line_1, Validators.required],
      address2: [this.entity.address.address_line_2],
      city: [this.entity.address.city, Validators.required],
      state: [this.entity.address.state, Validators.required],
      zipcode: [
        this.entity.address.zipcode,
        [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')],
      ],
    };

    const contactCrlConfig = {
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      email: ['', [Validators.required, Validators.email]],
    };

    this.form = this.formBuilder.group(mainIfoFormControls);
    this.contactForm = this.formBuilder.group(contactCrlConfig);
    this.loading = false;
  }

  formatData(fd: EditCustomerFormData): Customer {
    var businessAddress = {
      country: fd.country,
      address_line_1: fd.address1,
      address_line_2: fd.address2,
      city: fd.city,
      state: fd.state,
      zipcode: fd.zipcode,
    };

    return {
      id: fd.id,
      number: fd.number,
      name: fd.name,
      status: fd.status,
      address: businessAddress,
      default_contact: this.defaultContact,
      contacts: this.contacts,
    };
  }

  newContact() {
    console.log('sss');
    if (this.contactForm.valid) {
      console.log('form is valid, should send values');
      this.entity.contacts.push(this.contactForm.value);
      this.service.applyEdit(this.entity).subscribe((result) => {
        if (result.success) {
          //this.entity = result.data;
          this.contactForm.reset();
          this.service.notify('Action has not been implemented');
        } else {
          this.service.notify('item could not be updated');
        }
      });
    } else {
      console.log('form is invalid, showing notification');
      for (let fc of Object.keys(this.form.controls)) {
        console.log(fc + ' is ' + this.form.controls[fc].status);
        if (this.form.controls[fc].status == 'INVALID') {
          console.log(this.form.controls[fc].errors);
        }

        //console.log(this.form.controls[fc]);
      }
      console.log(this.form);
    }
  }

  refreshData() {
    this.loading = true;
    this.service.getDetails({ id: this.data.id }).subscribe((result) => {
      if (result.success == true) {
        this.entity = <Customer>result.data[0];
        this.contacts = this.entity.contacts;
        this.initForm();
      } else {
        this.service.notify('ERROR: could not reach the server');
        this.loading = false;
        this.ref.close();
      }
    });
  }

  get isLoading():boolean {
    return this.loading;
  }

  cancel(){
    const next: NextAction = {
      next: "open-details",
      entity: this.ref    };

    this.ref.close(next);
  }

  //public abstract editItem(): void; // ← close, then open edit component | trigger stub.

  applyEdit(): void {
    if (this.form.valid){
      console.log('form is valid, should send values');
      var formatedData = this.formatData(this.form.value);
      this.service.applyEdit(this.entity).subscribe(result => {
        if(result.success){
          this.service.notify("Action has not been implemented");
        } else {
          this.service.notify("item could not be updated");
        }
      });
    } else {
      console.log('form is invalid, showing notification');
      for (let fc of Object.keys(this.form.controls)) {
        console.log(fc+" is "+this.form.controls[fc].status)
        if(this.form.controls[fc].status == "INVALID") {
          console.log(this.form.controls[fc].errors);
        }

        //console.log(this.form.controls[fc]);
      }
      console.log(this.form);
    }


    const next: NextAction = {
      next: "open-details",
      entity: this.entity
    };

    this.ref.close(next);
  }
}
