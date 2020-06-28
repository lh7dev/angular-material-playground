import { Component, OnInit } from '@angular/core';
import { EntityNew } from 'src/app/shared/Abstracts/entity-new.class';
import { ProductService } from '../product.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import {
  NewProductFormData,
  Product,
  ProductType,
} from 'src/app/shared/Abstracts/product.interface';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss'],
})
export class ProductNewComponent extends EntityNew implements OnInit {
  controlsConfig: any;

  constructor(
    private custService: ProductService,
    public dialogRef: MatDialogRef<ProductNewComponent>,
    public fb: FormBuilder
  ) {
    super(custService, dialogRef, fb);
  }

  ngOnInit() {
    this.controlsConfig = {
      sku: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      status: ['active', Validators.required],
      type: ['service', Validators.required],
      soldBy: ['item', [Validators.required]],
      description: [''],
      price: ['', [Validators.required]],
    };
    this.initForm(this.controlsConfig);
  }

  formatData(fd: NewProductFormData): Product {
    const productType: ProductType = {
      type: fd.type,
      soldBy: fd.soldBy,
    };

    const product: Product = {
      id: null,
      name: fd.name,
      sku: fd.sku,
      status: fd.status,
      type: productType,
      description: fd.description,
      price: fd.price,
    };

    return product;
  }
}
