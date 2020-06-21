import { Address, Entity, Contact } from './shared.interfaces';
import { Product } from './product.interface';
import { Business } from './business,interface';
import { Customer } from './customer.interface';

export interface OrderListItem extends Entity {
  number: string;
  customer: string;
  status: string;
  created_on: string;
  total: number;
}

export interface Order extends Entity {
  number: string;
  shipping_address: Address;
  customer: string;
  business: Business;
  status: string;
  products: Product[];
  total: number;
}

export interface EditOrderFormData {
  shipping_address: Address;
  customer: Customer;
  status: string;
  products: Product[];
  total: number;
}

export interface NewOrderFormData {
  shipping_address: Address;
  customer: Customer;
  status: string;
  products: Product[];
  total: number;
}
