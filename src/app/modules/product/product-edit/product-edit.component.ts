import { Component, OnInit, Inject } from '@angular/core';
import { Product } from 'src/app/shared/Abstracts/product.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NextAction } from 'src/app/shared/Abstracts/entity-view.class';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  entity: Product | null;
  form: FormGroup = new FormGroup({});
  contactForm: FormGroup = new FormGroup({});

  private loading = true;

  constructor(
    private service: ProductService,
    private ref: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    console.log(this.entity);
  }

  ngOnInit(): void {
    this.entity = this.data as Product;
    this.refreshData();
  }

  initForm() {
    const mainIfoFormControls = {
      id: [this.entity.id, Validators.required],
      sku: [this.entity.sku, Validators.required],
      name: [this.entity.name, [Validators.required, Validators.minLength(3)]],
      status: [this.entity.status, Validators.required],
      type: [this.entity.type.type, Validators.required],
      soldBy: [this.entity.type.soldBy, [Validators.required]],
      category: [this.entity.category],
      description: [this.entity.description, [Validators.required]],
      price: [this.entity.price, [Validators.required]],
    };

    this.form = this.formBuilder.group(mainIfoFormControls);
    this.loading = false;
  }

  refreshData() {
    this.loading = true;
    this.service.getDetails({ id: this.data.id }).subscribe((result) => {
      if (result.success === true) {
        this.entity = result.data[0] as Product;
        this.initForm();
      } else {
        this.service.notify('ERROR: could not reach the server');
        this.loading = false;
        this.ref.close();
      }
    });
  }

  get isLoading(): boolean {
    return this.loading;
  }

  cancel() {
    const next: NextAction = {
      next: 'open-details',
      entity: this.entity,
    };

    this.ref.close(next);
  }

  applyEdit(): void {
    if (this.form.valid) {
      console.log('form is valid, should send values');
      this.service.applyEdit(this.entity).subscribe((result) => {
        if (result.success) {
          this.service.notify('Action has not been implemented');
        } else {
          this.service.notify('item could not be updated');
        }
      });
    } else {
      console.log('form is invalid, showing notification');
      for (const fc of Object.keys(this.form.controls)) {
        console.log(fc + ' is ' + this.form.controls[fc].status);
        if (this.form.controls[fc].status === 'INVALID') {
          console.log(this.form.controls[fc].errors);
        }
      }
      console.log(this.form);
    }

    const next: NextAction = {
      next: 'open-details',
      entity: this.entity,
    };

    this.ref.close(next);
  }
}
