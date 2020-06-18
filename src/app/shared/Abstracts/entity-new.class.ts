import { ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { iEntityService } from './shared.interfaces';
import { MatDialogRef } from '@angular/material/dialog';

export abstract class EntityNew {
  form: FormGroup;

  abstract controlsConfig: any;

  constructor(
    public service: iEntityService,
    public dialogRef: MatDialogRef<any>,
    public fb: FormBuilder
  ) {}

  initForm(formConfig: object) {
    this.form = this.fb.group(formConfig);
  }

  dialogClose(): void {
    this.dialogRef.close();
  }

  onFormSubmit() {
    if (this.form.valid) {
      console.log('form is valid, should send values');
      var formatedData = this.formatData(this.form.value);
      this.service.applyNew(formatedData).subscribe((result) => {
        // handle errors from backend
        if (!result.success) {
          this.service.notify(result.message);
        } else {
          this.service.notify(result.message);
          this.dialogRef.close();
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
      this.service.notify('The form is not valid');
    }
  }

  abstract formatData(data: any): object;
}
