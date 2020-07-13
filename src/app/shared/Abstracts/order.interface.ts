import { Address, Entity, Contact } from './shared.interfaces';
import { Product } from './product.interface';
import { Business } from './business.interface';
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
  customer: Customer;
  business: Business;
  status: string;
  charges: Charge[];
  total: number;
  date_created: Date;
  date_fulfilled?: Date;
  notes?: string | null;
}

export interface EditOrderFormData {
  shipping_address: Address;
  customer: Customer;
  status: string;
  charges: Charge[];
  total: number;
}

export interface NewOrderFormData {
  vendor: Business;
  isForShipping: boolean;
  shipping_address?: Address;
  customer: Customer;
  charges: Charge[];
  notes: string;
}

export interface Charge {
  product: Product;
  count: number;
  total: number;
}
