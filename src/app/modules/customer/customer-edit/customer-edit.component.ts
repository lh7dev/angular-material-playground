import { Component, OnInit, Inject } from '@angular/core';
import { EntityEdit } from 'src/app/shared/Abstracts/entity-edit.class';
import { EntityService } from 'src/app/shared/Abstracts/entity-service.class';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Entity, Contact } from 'src/app/shared/Abstracts/shared.interfaces';
import { CustomerService } from '../customer.service';
import { Customer, EditCustomerFormData } from 'src/app/shared/Abstracts/customer.interface';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent extends EntityEdit implements OnInit {
  //detailsComponent: any;
  contacts: Contact[] | null;

  controlsConfig: any | null;
  contactCrlConfig: any | null;

  constructor(
    private service: CustomerService,
    private ref: MatDialogRef<any>,
    private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Entity
  ) {
    super(service,ref,data, formBuilder);
   }

   ngOnInit(): void {
    this.setEntity(this.data);

    const customer: Customer = <Customer> this.entity;
    this.contacts = customer.contacts;
    this.defaultContact = customer.default_contact;

    this.controlsConfig = {
      name: [this.entity.name, [Validators.required, Validators.minLength(3)]],
      status: [this.entity.status, Validators.required],
      country: [this.entity.address.country, Validators.required],
      address1: [this.entity.address.address_line_1, Validators.required],
      address2: [this.entity.address.address_line_2],
      city: [this.entity.address.city, Validators.required],
      state: [this.entity.address.state, Validators.required],
      zipcode: [this.entity.address.zipcode, [Validators.required, Validators.pattern("^[0-9]{5}(?:-[0-9]{4})?$")]],
    };

    this.initForm(this.controlsConfig);

    this.contactCrlConfig = {
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern("^\\d{10}$")]],
      email: ['', [Validators.required, Validators.email]]
    }

    this.initContactForm(this.contactCrlConfig);
  }

  initForm(formConfig: object) {
    this.form = this.formBuilder.group(formConfig);
  }

  initContactForm(formConfig: object) {
    this.contactForm = this.formBuilder.group(formConfig);
  }

  formatData(fd: EditCustomerFormData):Customer {
    var businessAddress = {
      country: fd.country,
      address_line_1: fd.address1,
      address_line_2: fd.address2,
      city: fd.city,
      state: fd.state,
      zipcode: fd.zipcode
    };

    return {
      _id: fd._id,
      number: fd.number,
      name: fd.name,
      status: fd.status,
      address: businessAddress,
      default_contact: this.defaultContact,
      contacts:this.contacts
    };
  }

  newContact(){
    console.log("sss")
    if (this.contactForm.valid){
      console.log('form is valid, should send values');
      this.entity.contacts.push(this.contactForm.value);
      this.service.applyEdit(this.entity).subscribe(result => {
        if(result.success){
          //this.entity = result.data;
          this.contactForm.reset();
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
  }

}
