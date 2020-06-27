// Product interfaces

import { Entity } from './shared.interfaces';

export interface ProductListItem extends Entity {
  sku: string;
  name: string;
  status: string;
  type: string;
  price: number;
}

export interface ProductType {
  type: string;
  soldBy: string;
}

export interface Product extends Entity {
  sku: string;
  name: string;
  status: string;
  type: ProductType;
  price: number;
  features?: object[];
  description?: string;
  category?: string;
}
