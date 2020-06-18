import { EventEmitter, Output } from "@angular/core";

import { EntityService } from './entity-service.class';
import { Entity, Contact } from './shared.interfaces';
import { MatDialogRef } from '@angular/material/dialog';
import { NextAction } from './entity-view.class';
import { EntityDetails } from './entity-details.class';
import { FormGroup, FormBuilder } from '@angular/forms';

export abstract class EntityEdit {
  //abstract detailsComponent: any;

  form: FormGroup = new FormGroup({});
  contactForm: FormGroup = new FormGroup({});
  contacts: Contact[]| null;
  defaultContact: Contact | null;

  abstract controlsConfig: any;

  entity = null;

  constructor(
    private editService: EntityService,
    private dialogRef: MatDialogRef<any>,
    public entityData: Entity,
    private fb: FormBuilder
  ) {}

  initForm(form:FormGroup, formConfig: object) {
    form = this.fb.group(formConfig);
  }

  setEntity(entity:Entity) {
    this.editService.getDetails({_id: this.entityData._id}).subscribe(
      result=>{
        if(result.success == true){
          console.log("trace");
          this.entity = result.data[0];
        } else {
          this.editService.notify("ERROR: could not reach the server");
          this.dialogRef.close();
        }
      }
    )
  }

  cancel(){
    const next: NextAction = {
      next: "open-details",
      entity: this.entity
    };

    this.dialogRef.close(next);
  }

  //public abstract editItem(): void; // ← close, then open edit component | trigger stub.

  applyEdit(): void {
    if (this.form.valid){
      console.log('form is valid, should send values');
      var formatedData = this.formatData(this.form.value);
      this.editService.applyEdit(this.entity).subscribe(result => {
        if(result.success){
          this.editService.notify("Action has not been implemented");
        } else {
          this.editService.notify("item could not be updated");
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

    this.dialogRef.close(next);
  }

  abstract formatData(data: any): object;
}
