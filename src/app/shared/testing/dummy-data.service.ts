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
      observer.next(this.toApiResponse(false, "Delete action hasn't been implemented"));
    });
  }

  customerEdit(data: Entity): Observable<ApiResponse> {
    return new Observable<ApiResponse>((observer) => {
      observer.next(this.toApiResponse(false, "Delete action hasn't been implemented", data));
    });
  }

  private toProductListItemList(data: Product[]):ProductListItem[] {
    var res = data.map((x) => {
      var item: ProductListItem = {
        id: x.id,
        sku: x.sku,
        name: x.name,
        status: x.status,
        type: x.type.type,
        price: x.price
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

  private toOrderListItemList(data: Order[]): OrderListItem[] {
    var res = data.map((x) => {
      var item: OrderListItem = {
        id: x.id,
        number: x.number,
        customer: x.customer.name,
        status: x.status,
        created_on: x.date_created.toString(),
        total: x.total
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

  orderDetails(data: Entity): Observable<ApiResponse> {
    return new Observable<ApiResponse>((observer) => {
      console.log('sending data... not really');
      this.ORDERS.subscribe((result) => {
        const order = result.filter((x) => {
          if (x.id == data.id) {
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
      data: data,
      total: data.length,
    };
  }

  private toApiResponse(
    success: boolean,
    message?: string,
    data?: any
  ): ApiResponse {
    return {
      success: success,
      message: message,
      data: data,
    };
  }
}

// Customer list moch

const __APPLY_NEW_RESPONSE__ = {
  success: true,
  message: 'Customer created successfully',
};

// dummy inventory list
const _INVENTORY_LIST_: InventoryListItem[] = [
  {
    id: '12345678900',
    product: 'ASUS Laptop - Core I3 - 4GB RAM - 256GB SSD',
    sku: '12345678900',
    status: 'active',
    inStock: 15,
  },
  {
    id: '12345678901',
    product: 'ASUS Laptop - Core I5 - 8GB RAM - 500GB SSD',
    sku: '12345678901',
    status: 'active',
    inStock: 10,
  },
  {
    id: '12345678902',
    product: 'ASUS Laptop - Core I5 - 8GB RAM - 1TB HDD',
    sku: '12345678902',
    status: 'active',
    inStock: 11,
  },
  {
    id: '12345678903',
    product: 'ASUS Laptop - Core I5 - 16GB RAM - 500GB SSD',
    sku: '12345678903',
    status: 'active',
    inStock: 21,
  },
  {
    id: '12345678904',
    product: 'ASUS Laptop - Core I7 - 16GB RAM - 500GB SSD',
    sku: '12345678904',
    status: 'active',
    inStock: 15,
  },
  {
    id: '12345678905',
    product: 'ASUS Laptop - Core I7 - 16GB RAM - 1TB SSD',
    sku: '12345678905',
    status: 'active',
    inStock: 15,
  },
  {
    id: '12345678906',
    product: 'ASUS Laptop - Core I7 - 32GB RAM - 1TB SSD',
    sku: '12345678906',
    status: 'active',
    inStock: 9,
  },
  {
    id: '12345678907',
    product: 'Samsung Laptop - Core I3 - 4GB RAM - 256GB SSD',
    sku: '12345678907',
    status: 'active',
    inStock: 0,
  },
  {
    id: '12345678908',
    product: 'HP Laptop - Core I3 - 4GB RAM - 256GB SSD',
    sku: '12345678908',
    status: 'active',
    inStock: 3,
  },
  {
    id: '12345678909',
    product: 'HP Laptop - Core I5 - 32GB RAM - 1TB SSD',
    sku: '12345678909',
    status: 'active',
    inStock: 7,
  },
  {
    id: '12345678910',
    product: 'ASUS Laptop - Core I7 - 32GB RAM - 1TB SSD - 1TB HDD',
    sku: '12345678910',
    status: 'active',
    inStock: 5,
  },
  {
    id: '12345678911',
    product: 'Toshiba Laptop - Core I3 - 4GB RAM - 256GB SSD',
    sku: '12345678911',
    status: 'active',
    inStock: 15,
  },
];

const _INVENTORY_ENTITY_LIST_: EntityListData = {
  data: _INVENTORY_LIST_,
  total: _INVENTORY_LIST_.length,
};

const _INVENTORY_LIST_ApiRes_: ApiResponse = {
  success: true,
  data: _INVENTORY_ENTITY_LIST_,
};

// PRODUCTS DATA
const _PRODUCT_LIST_: ProductListItem[] = [
  {
    id: '12255sdasdqwefaaa',
    sku: '125400',
    name: 'Laptop PC - Core I3 - 256GB SSD - 4GB RAM',
    status: 'active',
    price: 399.99,
    type: 'product',
  },
  {
    id: '12255sdasdqwefaab',
    sku: '125401',
    name: 'Laptop PC - Core I5 - 500GB SSD - 8GB RAM',
    status: 'active',
    price: 599.99,
    type: 'product',
  },
  {
    id: '12255sdasdqwefaac',
    sku: '125402',
    name: 'Laptop PC - Core I7 - 1TB SSD - 16GB RAM',
    status: 'active',
    price: 599.99,
    type: 'product',
  },
  {
    id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
];

const _PRODUCT_LIST_DATA_: EntityListData = {
  data: _PRODUCT_LIST_,
  total: _PRODUCT_LIST_.length,
};

const _PRODUCT_LIST_RESPONSE_: ApiResponse = {
  success: true,
  data: _PRODUCT_LIST_DATA_,
};

const __INVENTORY__: InventoryItem[] = [];
/*

const genZipcode = () => {
  return Math.floor(Math.random()*90000) + 10000+"";
}

const genSuiteNumber = () => {
  const decition = Math.random()*100;

  if(decition < 70){
	return "suite "+Math.floor(Math.random()*999);
  } else {
	return null;
  }
}

const genPhoneNumber = ()=>{
  return Math.floor(Math.random()*9000000000) + 1000000000+"";
}

const genCustomers = () => {
  let objects:Customer[]
  for(let i=0; i<25;i++){
	const  id = {id: Math.floor(Math.random()*20200000000000)+""};
	const name =  {name: __CUSTOMER_NAMES__[i]};
	const address:Address = {
	  address_line_1: __ADDRESSES__[i].address_line_1,
	  address_line_2: genSuiteNumber(),
	  country: __ADDRESSES__[i].country,
	  city: __ADDRESSES__[i].city,
	  state: __ADDRESSES__[i].state,
	  zipcode: genZipcode()
	};
	const contact = {};
	Object.assign(contact, __CUSTOMER_CONTACTS__[i], {phone: genPhoneNumber()});
	const default_contact = {
	  default_contact: contact
	};
	const contacts = [default_contact];
	var obj:Customer;
	Object.assign(obj, id, name, address, default_contact, contacts);
	objects.push(obj);
  }
  return objects;
}


const _PREPARE_CUSTOMER_LIST_ = () => {
  let res: CustomerListItem[] = [];
  for (let c of __CUSTOMERS__) {
	res.push({
	  id: c.id,
	  number: c.number,
	  name: c.name,
	  status: c.status,
	});
  }

  return res;
};
*/
const __CUSTOMER_NAMES__ = [
  'Weber, Bins and Buckridge',
  'Carter, Ebert and Effertz',
  'Schroeder, Tillman and Treutel',
  'Runte Inc',
  'Rice and Sons',
  "Donnelly, D'Amore and Senger",
  'Renner - Beatty',
  'Lakin - Ratke',
  'Kuphal, Moore and McCullough',
  'Ledner and Sons',
  'Lowe, Halvorson and Schmidt',
  'Hilpert - Goodwin',
  'Greenfelder LLC',
  "Bogan - D'Amore",
  'Keeling, Jenkins and Shields',
  'Kertzmann - Dickens',
  'Leffler, Heaney and Bergstrom',
  'Moore - Kuphal',
  'Jakubowski Inc',
  'Spencer Group',
  'Langosh - McLaughlin',
  'Mertz - Goldner',
  'Treutel, Prohaska and Carter',
  'Metz and Sons',
  'Ankunding - Lesch',
];
const __ADDRESSES__ = [
  {
    address_line_1: '85221 Dennis Parkway',
    city: 'Tampa',
    state: 'Florida',
    country: 'United States',
  },
  {
    address_line_1: '294 Upham Place',
    city: 'Orlando',
    state: 'Florida',
    country: 'United States',
  },
  {
    address_line_1: '3297 Aberg Street',
    city: 'Buffalo',
    state: 'New York',
    country: 'United States',
  },
  {
    address_line_1: '22 Calypso Road',
    city: 'Cincinnati',
    state: 'Ohio',
    country: 'United States',
  },
  {
    address_line_1: '9437 Manley Terrace',
    city: 'Montgomery',
    state: 'Alabama',
    country: 'United States',
  },
  {
    address_line_1: '8430 Schiller Trail',
    city: 'Saint Cloud',
    state: 'Minnesota',
    country: 'United States',
  },
  {
    address_line_1: '35 David Junction',
    city: 'Pompano Beach',
    state: 'Florida',
    country: 'United States',
  },
  {
    address_line_1: '35519 Lukken Alley',
    city: 'Nashville',
    state: 'Tennessee',
    country: 'United States',
  },
  {
    address_line_1: '40329 Larry Road',
    city: 'Macon',
    state: 'Georgia',
    country: 'United States',
  },
  {
    address_line_1: '6 Green Ridge Court',
    city: 'Arlington',
    state: 'Texas',
    country: 'United States',
  },
  {
    address_line_1: '45735 Barnett Circle',
    city: 'Alhambra',
    state: 'California',
    country: 'United States',
  },
  {
    address_line_1: '07295 Hauk Crossing',
    city: 'Philadelphia',
    state: 'Pennsylvania',
    country: 'United States',
  },
  {
    address_line_1: '38 Crescent Oaks Circle',
    city: 'Las Vegas',
    state: 'Nevada',
    country: 'United States',
  },
  {
    address_line_1: '59 Gulseth Lane',
    city: 'Houston',
    state: 'Texas',
    country: 'United States',
  },
  {
    address_line_1: '57 Algoma Crossing',
    city: 'Fort Lauderdale',
    state: 'Florida',
    country: 'United States',
  },
  {
    address_line_1: '99648 Village Green Pass',
    city: 'Santa Fe',
    state: 'New Mexico',
    country: 'United States',
  },
  {
    address_line_1: '27 Arapahoe Parkway',
    city: 'New York City',
    state: 'New York',
    country: 'United States',
  },
  {
    address_line_1: '796 Alpine Trail',
    city: 'Houston',
    state: 'Texas',
    country: 'United States',
  },
  {
    address_line_1: '16419 Jackson Alley',
    city: 'Chicago',
    state: 'Illinois',
    country: 'United States',
  },
  {
    address_line_1: '8 Tennyson Pass',
    city: 'Dayton',
    state: 'Ohio',
    country: 'United States',
  },
  {
    address_line_1: '78512 Hansons Trail',
    city: 'Laurel',
    state: 'Maryland',
    country: 'United States',
  },
  {
    address_line_1: '28 Manufacturers Lane',
    city: 'Bonita Springs',
    state: 'Florida',
    country: 'United States',
  },
  {
    address_line_1: '587 Steensland Drive',
    city: 'Phoenix',
    state: 'Arizona',
    country: 'United States',
  },
  {
    address_line_1: '90 Dakota Pass',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
  },
  {
    address_line_1: '580 Talisman Terrace',
    city: 'Brooklyn',
    state: 'New York',
    country: 'United States',
  },
];
const __CUSTOMER_CONTACTS__ = [
  {
    contactName: 'Wallas Buckeridge',
    email: 'wbuckeridge0@spotify.com',
  },
  {
    contactName: 'Winnie Grey',
    email: 'wgrey1@state.tx.us',
  },
  {
    contactName: 'Christophorus Howlings',
    email: 'chowlings2@dot.gov',
  },
  {
    contactName: 'Hayyim Campanelli',
    email: 'hcampanelli3@wix.com',
  },
  {
    contactName: 'Yvonne Grigorescu',
    email: 'ygrigorescu4@latimes.com',
  },
  {
    contactName: 'Cherri Tidbold',
    email: 'ctidbold5@typepad.com',
  },
  {
    contactName: 'Kennie Skene',
    email: 'kskene6@reddit.com',
  },
  {
    contactName: 'Wendeline Gammack',
    email: 'wgammack7@engadget.com',
  },
  {
    contactName: 'Averyl Greschke',
    email: 'agreschke8@imageshack.us',
  },
  {
    contactName: 'Virgie Feeny',
    email: 'vfeeny9@hubpages.com',
  },
  {
    contactName: 'Tiffany Dixey',
    email: 'tdixeya@fastcompany.com',
  },
  {
    contactName: 'Tildy Klulisek',
    email: 'tklulisekb@ca.gov',
  },
  {
    contactName: 'Griff Duding',
    email: 'gdudingc@sun.com',
  },
  {
    contactName: 'Annmarie Aizikovitch',
    email: 'aaizikovitchd@issuu.com',
  },
  {
    contactName: 'Ashli Livesay',
    email: 'alivesaye@independent.co.uk',
  },
  {
    contactName: 'Roda Meere',
    email: 'rmeeref@tinypic.com',
  },
  {
    contactName: 'Cammy Moodycliffe',
    email: 'cmoodycliffeg@slideshare.net',
  },
  {
    contactName: 'Winonah Pires',
    email: 'wpiresh@over-blog.com',
  },
  {
    contactName: 'Babs Boulds',
    email: 'bbouldsi@wired.com',
  },
  {
    contactName: 'Shawn Cathcart',
    email: 'scathcartj@aboutads.info',
  },
  {
    contactName: 'Grant Simoes',
    email: 'gsimoesk@businessweek.com',
  },
  {
    contactName: 'Martynne Klampt',
    email: 'mklamptl@tinyurl.com',
  },
  {
    contactName: 'Aubine Clappison',
    email: 'aclappisonm@ibm.com',
  },
  {
    contactName: 'Madison Laviss',
    email: 'mlavissn@ifeng.com',
  },
  {
    contactName: 'Elka Edgecumbe',
    email: 'eedgecumbeo@constantcontact.com',
  },
];
