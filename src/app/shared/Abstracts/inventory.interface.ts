import { Address, Entity, Contact } from './shared.interfaces';
import { ProductType } from './product.interface';

export interface InventoryListItem extends Entity {
  product: string;
  sku: string;
  status: string;
  inStock: number;
}

export interface InventoryItem extends Entity {
  product: string;
  sku: string;
  status: string;
  inStock: number;
  type: ProductType;
}

