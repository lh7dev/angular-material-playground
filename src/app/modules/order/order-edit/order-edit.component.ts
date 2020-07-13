import { Component, OnInit, Inject } from '@angular/core';
import {
  Order,
  Charge,
  NewOrderFormData,
} from 'src/app/shared/Abstracts/order.interface';
import { Customer } from 'src/app/shared/Abstracts/customer.interface';
import { Business } from 'src/app/shared/Abstracts/business.interface';
import { OrderService } from '../order.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from '../../customer/customer.service';
import { ProductService } from '../../product/product.service';
import { Product } from 'src/app/shared/Abstracts/product.interface';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { BusinessService } from 'src/app/shared/services/business.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Address } from 'src/app/shared/Abstracts/shared.interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { NextAction } from 'src/app/shared/Abstracts/entity-view.class';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss'],
})
export class OrderEditComponent implements OnInit {
  entity: Order | null;
  customer: Customer | null;
  business: Business | null;
  charges: MatTableDataSource<Charge> = new MatTableDataSource([]);
  newCharge: Charge | null;
  private productForCharge: Product | null;
  chargesColumns = ['sku', 'product', 'unitPrice', 'count', 'total', 'delete'];

  // tslint:disable: variable-name
  private _availbleCustomers: Customer[];
  private _availableProducts: Product[];

  form: FormGroup | null;

  /*  private newOrderForm: FormGroup | null; */

  selectedCustomerCtrl = new FormControl();

  shippingAddressForm: FormGroup | null;
  addChargeForm: FormGroup | null;
  selectedProductCtrl = new FormControl('', Validators.required);
  productCountCtrl = new FormControl('', Validators.required);
  notesCtrl = new FormControl();

  autocompleteFilteredCustomer: Observable<Customer[]>;
  autocompleteFilteredProduct: Observable<Product[]>;

  selectedCustomer: Customer | null;

  private loadingCustomers = true;
  private loadingProducts = true;
  private loadingVendor = true;

  useDefaultShipping = true;
  orderStatus: string;

  constructor(
    private businessSrv: BusinessService,
    private cutomerSrv: CustomerService,
    private productSrv: ProductService,
    private service: OrderService,
    public dialogRef: MatDialogRef<any>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) {
    this.autocompleteFilteredCustomer = this.selectedCustomerCtrl.valueChanges.pipe(
      map((customer) =>
        customer
          ? this._filterCustomers(customer)
          : this._availbleCustomers.slice()
      )
    );

    this.autocompleteFilteredProduct = this.selectedProductCtrl.valueChanges.pipe(
      map((product) =>
        product
          ? this._filterProducts(product)
          : this._availableProducts.slice()
      )
    );
  }

  ngOnInit(): void {
    this.entity = this.data;
    this.fetchAvailableBusiness();
    this.fetchAvailableCustomers();
    this.fetchAvailableProducts();
    this.initShippingAddressForm();
    this.initAddChargeForm();
    this.initOrderViewModel();
  }

  fetchAvailableBusiness(): void {
    this.businessSrv.businessInfo().subscribe((result) => {
      if (result.success) {
        this.business = result.data as Business;
        this.loadingVendor = false;
      } else {
        this.service.notify(result.message);
      }
    });
  }

  fetchAvailableCustomers(): void {
    this.cutomerSrv.getAvailables().subscribe((result) => {
      if (result.success) {
        this._availbleCustomers = result.data as Customer[];
        this.loadingCustomers = false;
      } else {
        this.service.notify(result.message);
      }
    });
  }

  fetchAvailableProducts(): void {
    this.productSrv.getAvailables().subscribe((result) => {
      if (result.success) {
        this._availableProducts = result.data as Product[];
        this.loadingProducts = false;
      } else {
        this.service.notify(result.message);
      }
    });
  }

  initShippingAddressForm(): void {
    this.shippingAddressForm = this.fb.group({
      address_line_1: ['', Validators.required],
      address_line_2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      country: ['United States', Validators.required],
    });
  }

  initAddChargeForm(): void {
    this.addChargeForm = this.fb.group({
      productCtrl: this.productCountCtrl,
      count: this.productCountCtrl,
      total: ['', Validators.required],
    });
  }

  initOrderViewModel(): void {
    this.charges = new MatTableDataSource(this.entity.charges);
    this.customer = this.entity.customer;
    this.business = this.entity.business;
    this.orderStatus = this.entity.status;
    this.selectedCustomer = this.entity.customer;
    this.shippingAddressForm.setValue(this.entity.shipping_address);
    this.useDefaultShipping = false;
    if (this.entity.notes) {
      this.notesCtrl.setValue(this.entity.notes);
    }
  }

  cancel() {
    const next: NextAction = {
      next: 'open-details',
      entity: this.entity,
    };

    this.dialogRef.close(next);
  }

  applyEdit(): void {
    const isShippingAddressValid = this.shippingAddressForm.valid;
    const isCustomerValid = this.selectedCustomer ? true : false;
    const isVendorValid = this.business ? true : false;
    const hasCharges = this.charges.data.length > 0 ? true : false;
    if (
      isShippingAddressValid &&
      isCustomerValid &&
      isVendorValid &&
      hasCharges
    ) {
      console.log('Order VALID');
      const order: Order = this.orderModel();

      this.service.applyNew(order).subscribe((result) => {
        if (result.success) {
          this.service.notify(
            'Order data is VALID.. but action is not implemented',
            4000
          );
          this.dialogRef.close();
        } else {
          this.service.notify(result.message);
        }
      });
    } else {
      this.service.notify('ERROR: The data for the Order is incomplete');
    }
  }

  private orderModel(): Order {
    const order: Order = {
      id: this.entity.id,
      customer: this.selectedCustomer,
      business: this.business,
      charges: this.charges.data,
      number: this.entity.number,
      shipping_address: this.shippingAddressForm.value,
      status: this.orderStatus,
      notes: this.notesCtrl.value,
      date_created: this.entity.date_created,
      total: this.totalDue,
    };
    return order;
  }

  get isLoading(): boolean {
    if (
      !this.loadingCustomers &&
      !this.loadingProducts &&
      !this.loadingVendor
    ) {
      return false;
    } else {
      return true;
    }
  }

  get isLoadingProducts(): boolean {
    return this.loadingProducts;
  }

  get totalNewCharge(): number {
    try {
      const qty = this.addChargeForm.value.count;
      const unitPrice = this.productForCharge.price;
      const chargeTotal = unitPrice * qty;
      this.addChargeForm.patchValue({ total: chargeTotal });
      return chargeTotal;
    } catch (e) {
      this.addChargeForm.patchValue({ total: '' });
      return null;
    }
  }

  selectedCustomerName(customer: Customer) {
    return customer ? customer.name : undefined;
  }

  private _filterCustomers(value: string): Customer[] {
    const filterValue = value.toLowerCase();

    this.updateSelectedCustomer();

    return this._availbleCustomers.filter(
      (customer) => customer.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private _filterProducts(value: string): Product[] {
    const filterValue = value.toLowerCase();

    this.updateSelectedProduct();

    return this._availableProducts.filter(
      (product) => product.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  get isCustomerSelected(): boolean {
    return this.selectedCustomer ? true : false;
  }

  get isProductSelected(): boolean {
    return this.productForCharge ? true : false;
  }

  private updateShippingAddress(address: Address) {
    this.shippingAddressForm.patchValue(address);
  }

  updateSelectedCustomer() {
    this.selectedCustomer = this._availbleCustomers.filter((c) => {
      return c.name === this.selectedCustomerCtrl.value;
    })[0];
    try {
      this.updateShippingAddress(this.selectedCustomer.address);
    } catch (e) {
      console.log('invalid address');
    }
  }

  updateSelectedProduct() {
    this.productForCharge = this._availableProducts.filter((p) => {
      return p.name === this.selectedProductCtrl.value;
    })[0];
  }

  changeShippingAddressSetting(): void {
    this.useDefaultShipping = !this.useDefaultShipping;
  }

  addCharge(): void {
    console.log('trace new charge submit');
    console.log(this.addChargeForm.value);
    if (this.addChargeForm.valid) {
      const charge: Charge = {
        total: this.totalNewCharge,
        count: this.productCountCtrl.value,
        product: this.productForCharge,
      };
      const newCharges = [...this.charges.data, charge];
      this.charges = new MatTableDataSource(newCharges);
      this.addChargeForm.reset();
      this.selectedProductCtrl.reset();
      console.log(this.charges);
      console.log(charge);
    } else {
      this.service.notify(
        'please enter all required information for your new charge and try again',
        6000
      );
    }
  }

  removeCharge(item: Charge) {
    const data = this.charges.data;
    const index = data.indexOf(item);
    const newCharges = data.splice(index, 1);
    console.log(data);
    this.charges = new MatTableDataSource(data);
    /*
     */
  }

  get totalCharges(): number {
    return this.charges.data.length;
  }

  get orderTotal(): number {
    let total = 0;
    if (this.totalCharges > 0) {
      for (const ch of this.charges.data) {
        total += ch.total;
      }
    }
    return total;
  }

  get totalDue(): number {
    return this.orderTotal * 0.07 + this.orderTotal;
  }
}
