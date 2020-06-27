import { Address, Entity, Contact } from './shared.interfaces';

export interface CustomerListItem extends Entity {
  number: string;
  name: string;
  status: string;
}

export interface Customer extends Entity {
  number: string;
  name: string;
  address: Address;
  status: string;
  default_contact: Contact;
  contacts: Contact[];
}

export interface EditCustomerFormData extends Entity {
  name: string;
  number: string;
  status: string;
  country: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface NewCustomerFormData extends Entity {
  name: 'string';
  status: 'string';
  country: 'string';
  address1: 'string';
  address2?: 'string';
  city: 'string';
  state: 'string';
  zipcode: 'string';
  contactName: 'string';
  phone: 'string';
  email: 'string';
}
