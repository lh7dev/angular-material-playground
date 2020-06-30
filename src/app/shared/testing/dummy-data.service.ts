import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  EntityListData,
  Entity,
  iEntityListView,
  Address,
  Contact,
} from '../Abstracts/shared.interfaces';
import {
  InventoryListItem,
  InventoryItem,
} from '../Abstracts/inventory.interface';
import { CustomerListItem, Customer } from '../Abstracts/customer.interface';
import { ProductListItem, Product } from '../Abstracts/product.interface';

import { HttpClient } from '@angular/common/http';
import { Order, OrderListItem } from '../Abstracts/order.interface';
// TEST DATA

@Injectable({
  providedIn: 'root',
})
export class DummyDataService {
  private TestData(xDataKey): Observable<any> {
    return new Observable<any>((observer) => {
      const fileName = 'test-data';
      this.http
        .get('./assets/test-data/' + fileName + '.json')
        .subscribe((result) => {
          observer.next(result[xDataKey]);
        });
    });
  }

  get CUSTOMERS(): Observable<Customer[]> {
    return <Observable<Customer[]>>this.TestData('CUSTOMERS');
  }

  get PRODUCTS(): Observable<Product[]> {
    return <Observable<Product[]>>this.TestData('PRODUCTS');
  }

  get ORDERS(): Observable<Order[]> {
    return <Observable<Order[]>>this.TestData('ORDERS');
  }

  constructor(private http: HttpClient) {}

  customerDetails(data: Entity): Observable<ApiResponse> {
    return new Observable<ApiResponse>((observer) => {
      console.log('sending data... not really');
      this.CUSTOMERS.subscribe((result) => {
        const customer = result.filter((x) => {
          if (x.id == data.id) {
            return x;
          }
        });
        observer.next(this.toApiResponse(true, null, customer));
      });
    });
  }

  private toCustomerListItemList(data: Customer[]): CustomerListItem[] {
    var res = data.map((x) => {
      var item: CustomerListItem = {
        id: x.id,
        number: x.number,
        name: x.name,
        status: x.status,
      };
      return item;
    });
    console.log(res);
    return res;
  }

  customerList(): Observable<ApiResponse> {
    return new Observable<ApiResponse>((observer) => {
      this.CUSTOMERS.subscribe((result) => {
        console.log(result);
        const list: CustomerListItem[] = this.toCustomerListItemList(result);
        const listViewData: EntityListData = this.toEntityListData(list);
        console.log(result);
        const packagedResponse = this.toApiResponse(true, null, listViewData);
        observer.next(packagedResponse);
      });
    });
  }

  customerDelete(data: Entity): Observable<ApiResponse> {
    return new Observable<ApiResponse>((observer) => {
      observer.next(
        this.toApiResponse(false, "Delete action hasn't been implemented")
      );
    });
  }

  customerEdit(data: Entity): Observable<ApiResponse> {
    return new Observable<ApiResponse>((observer) => {
      observer.next(
        this.toApiResponse(false, "Delete action hasn't been implemented", data)
      );
    });
  }

  private toProductListItemList(data: Product[]): ProductListItem[] {
    var res = data.map((x) => {
      var item: ProductListItem = {
        id: x.id,
        sku: x.sku,
        name: x.name,
        status: x.status,
        type: x.type.type,
        price: x.price,
      };
      return item;
    });
    console.log(res);
    return res;
  }

  productList(): Observable<ApiResponse> {
    return new Observable<ApiResponse>((observer) => {
      this.PRODUCTS.subscribe((result) => {
        console.log(result);
        const list: ProductListItem[] = this.toProductListItemList(result);
        const listViewData: EntityListData = this.toEntityListData(list);
        console.log(result);
        const packagedResponse = this.toApiResponse(true, null, listViewData);
        observer.next(packagedResponse);
      });
    });
  }

  productDetails(data: Entity): Observable<ApiResponse> {
    return new Observable<ApiResponse>((observer) => {
      console.log('sending data... not really');
      this.PRODUCTS.subscribe((result) => {
        const product = result.filter((x) => {
          if (x.id === data.id) {
            return x;
          }
        });
        observer.next(this.toApiResponse(true, null, product));
      });
    });
  }

  private toOrderListItemList(data: Order[]): OrderListItem[] {
    var res = data.map((x) => {
      var item: OrderListItem = {
        id: x.id,
        number: x.number,
        customer: x.customer.name,
        status: x.status,
        created_on: x.date_created.toString(),
        total: x.total,
      };

      return item;
    });
    return res;
  }

  orderList(): Observable<ApiResponse> {
    return new Observable<ApiResponse>((observer) => {
      this.ORDERS.subscribe((result) => {
        const list: OrderListItem[] = this.toOrderListItemList(result);
        const listViewData: EntityListData = this.toEntityListData(list);
        console.log(result);
        const packagedResponse = this.toApiResponse(true, null, listViewData);
        observer.next(packagedResponse);
      });
    });
  }

  getAvailableCustomers(): Observable<ApiResponse> {
    return new Observable<ApiResponse>((observer) => {
      this.CUSTOMERS.subscribe((result) => {
        const customer = result.filter((x) => {
          if (x.status === 'active') {
            return x;
          }
        });
        observer.next(this.toApiResponse(true, null, customer));
      });
    });
  }

  getAvailableProducts(): Observable<ApiResponse> {
    return new Observable<ApiResponse>((observer) => {
      this.PRODUCTS.subscribe((result) => {
        const product = result.filter((x) => {
          if (x.status === 'active') {
            return x;
          }
        });
        observer.next(this.toApiResponse(true, null, product));
      });
    });
  }

  orderDetails(data: Entity): Observable<ApiResponse> {
    return new Observable<ApiResponse>((observer) => {
      console.log('sending data... not really');
      this.ORDERS.subscribe((result) => {
        const order = result.filter((x) => {
          if (x.id === data.id) {
            return x;
          }
        });
        observer.next(this.toApiResponse(true, null, order));
      });
    });
  }

  applyNew(data: object): Observable<ApiResponse> {
    return new Observable<ApiResponse>((observer) => {
      console.log('sending data... not really');
      observer.next(__APPLY_NEW_RESPONSE__);
    });
  }

  inventoryList(): Observable<ApiResponse> {
    return new Observable<ApiResponse>((observer) => {
      const list: InventoryListItem[] = __INVENTORY__;
      const listViewData: EntityListData = this.toEntityListData(list);
      const packagedResponse = this.toApiResponse(true, null, list);
      observer.next(packagedResponse);
    });
  }

  private toEntityListData(data: Entity[]) {
    return {
      data,
      total: data.length,
    };
  }

  private toApiResponse(
    success: boolean,
    message?: string,
    data?: any
  ): ApiResponse {
    return {
      success,
      message,
      data,
    };
  }
}

// Customer list moch

const __APPLY_NEW_RESPONSE__ = {
  success: true,
  message: 'Item created successfully',
};

const __INVENTORY__: InventoryItem[] = [];
