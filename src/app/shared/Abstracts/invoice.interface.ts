import { Address, Entity, Contact } from './shared.interfaces';
import { Product } from './product.interface';
import { Business } from './business,interface';
import { Customer } from './customer.interface';
import { Order } from './order.interface';

export interface InvoiceListItem extends Entity {
  number: string;
  customer: string;
  status: string;
  posted_on?: string;
  total: number;
}

export interface Invoice extends Entity {
  number: string;
  billing_address: Address;
  use_shipping_address: boolean;
  customer: Customer;
  business: Business;
  status: string;
  charges: Charge[];
  total: number;
  orders: Order[]
}

export interface EditInvoiceFormData extends Entity{
  number: string;
  billing_address: Address;
  use_shipping_address: boolean;
  customer: Customer;
  business: Business;
  status: string;
  charges: Charge[];
  total: number;
  orders: Order[]
}

export interface NewInvoiceFormData {
  billing_address: Address;
  use_shipping_address: boolean;
  customer: Customer;
  business: Business;
  status: string;
  charges: Charge[];
  total: number;
  orders: Order[]
}

export interface Charge {
  product: Product;
  quantity: number;
  total: number;
}
