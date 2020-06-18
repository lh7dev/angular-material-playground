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
import { ProductListItem } from '../Abstracts/product.interface';

@Injectable({
  providedIn: 'root',
})
export class DummyDataService {
  constructor() {}

  customerDetails(data: Entity): Observable<ApiResponse> {
    return new Observable<ApiResponse>((observer) => {
      console.log('sending data... not really');
      const result = __CUSTOMERS__.filter((x) => {
        if (x._id == data._id) {
          return x;
        }
      });
      observer.next(this.toApiResponse(true, null, result));
    });
  }

  private toCustomerListItemList(data:Customer[]): CustomerListItem[] {
    var res = data.map(x=>{
      var item: CustomerListItem ={
        _id: x._id,
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
      const list: CustomerListItem[] = this.toCustomerListItemList(__CUSTOMERS__);
      const listViewData: EntityListData = this.toEntityListData(list);
      console.log(__CUSTOMERS__);
      const packagedResponse = this.toApiResponse(true, null, listViewData);
      observer.next(packagedResponse);
    });
  }

  customerDelete(data: Entity): Observable<ApiResponse> {
    return new Observable<ApiResponse>((observer) => {
      this.toApiResponse(false, "Delete action hasn't been implemented");
    });
  }

  customerEdit(data: Entity): Observable<ApiResponse> {
    return new Observable<ApiResponse>((observer) => {
      this.toApiResponse(false, "Delete action hasn't been implemented", data);
    });
  }

  productList(): Observable<ApiResponse> {
    return new Observable<ApiResponse>((observer) => {
      observer.next(_PRODUCT_LIST_RESPONSE_);
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

const __APPLY_NEW_RESPONSE__ = {
  success: true,
  message: 'Customer created successfully',
};

// dummy inventory list
const _INVENTORY_LIST_: InventoryListItem[] = [
  {
    _id: '12345678900',
    product: 'ASUS Laptop - Core I3 - 4GB RAM - 256GB SSD',
    sku: '12345678900',
    status: 'active',
    inStock: 15,
  },
  {
    _id: '12345678901',
    product: 'ASUS Laptop - Core I5 - 8GB RAM - 500GB SSD',
    sku: '12345678901',
    status: 'active',
    inStock: 10,
  },
  {
    _id: '12345678902',
    product: 'ASUS Laptop - Core I5 - 8GB RAM - 1TB HDD',
    sku: '12345678902',
    status: 'active',
    inStock: 11,
  },
  {
    _id: '12345678903',
    product: 'ASUS Laptop - Core I5 - 16GB RAM - 500GB SSD',
    sku: '12345678903',
    status: 'active',
    inStock: 21,
  },
  {
    _id: '12345678904',
    product: 'ASUS Laptop - Core I7 - 16GB RAM - 500GB SSD',
    sku: '12345678904',
    status: 'active',
    inStock: 15,
  },
  {
    _id: '12345678905',
    product: 'ASUS Laptop - Core I7 - 16GB RAM - 1TB SSD',
    sku: '12345678905',
    status: 'active',
    inStock: 15,
  },
  {
    _id: '12345678906',
    product: 'ASUS Laptop - Core I7 - 32GB RAM - 1TB SSD',
    sku: '12345678906',
    status: 'active',
    inStock: 9,
  },
  {
    _id: '12345678907',
    product: 'Samsung Laptop - Core I3 - 4GB RAM - 256GB SSD',
    sku: '12345678907',
    status: 'active',
    inStock: 0,
  },
  {
    _id: '12345678908',
    product: 'HP Laptop - Core I3 - 4GB RAM - 256GB SSD',
    sku: '12345678908',
    status: 'active',
    inStock: 3,
  },
  {
    _id: '12345678909',
    product: 'HP Laptop - Core I5 - 32GB RAM - 1TB SSD',
    sku: '12345678909',
    status: 'active',
    inStock: 7,
  },
  {
    _id: '12345678910',
    product: 'ASUS Laptop - Core I7 - 32GB RAM - 1TB SSD - 1TB HDD',
    sku: '12345678910',
    status: 'active',
    inStock: 5,
  },
  {
    _id: '12345678911',
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

// DUMMY DATA
const _PRODUCT_LIST_: ProductListItem[] = [
  {
    _id: '12255sdasdqwefaaa',
    sku: '125400',
    name: 'Laptop PC - Core I3 - 256GB SSD - 4GB RAM',
    status: 'active',
    price: 399.99,
    type: 'product',
  },
  {
    _id: '12255sdasdqwefaab',
    sku: '125401',
    name: 'Laptop PC - Core I5 - 500GB SSD - 8GB RAM',
    status: 'active',
    price: 599.99,
    type: 'product',
  },
  {
    _id: '12255sdasdqwefaac',
    sku: '125402',
    name: 'Laptop PC - Core I7 - 1TB SSD - 16GB RAM',
    status: 'active',
    price: 599.99,
    type: 'product',
  },
  {
    _id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    _id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    _id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    _id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    _id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    _id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    _id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    _id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    _id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    _id: '12255sdasdqwefsxc',
    sku: '125403',
    name: 'Laptop Repair',
    status: 'active',
    price: 150,
    type: 'service',
  },
  {
    _id: '12255sdasdqwefsxc',
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

const __CUSTOMERS__: Customer[] = [
  {
    _id: '125400',
    number: '125400',
    name: 'west coast logistics llc',
    status: 'active',
    address: {
      country: 'united states',
      address_line_1: '1254 St. Pedro',
      city: 'Miami',
      state: 'Florida',
      zipcode: '33015',
    },
    default_contact: {
      name: 'Andrew Hoffman',
      phone: '1112223333',
      email: 'ahoffman@xyz.com',
    },
    contacts: [
      {
        name: 'Jhon Doe',
        phone: '1112223333',
        email: 'ahoffman@xyz.com',
      },
      {
        name: 'Maria Isabel',
        phone: '1112223333',
        email: 'ahoffman@xyz.com',
      },
      {
        name: 'Andrew Hoffman',
        phone: '1112223333',
        email: 'ahoffman@xyz.com',
      },
    ],
  },
  {
    _id: '125401',
    number: '125401',
    name: 'east coast logistics llc',
    status: 'active',
    address: {
      country: 'united states',
      address_line_1: '1254 St. Pedro',
      city: 'Miami',
      state: 'Florida',
      zipcode: '33015',
    },
    default_contact: {
      name: 'Andrew Hoffman',
      phone: '1112223333',
      email: 'ahoffman@xyz.com',
    },
    contacts: [
      {
        name: 'Andrew Hoffman',
        phone: '1112223333',
        email: 'ahoffman@xyz.com',
      },
    ],
  },
  {
    _id: '125402',
    number: '125402',
    name: 'Arnaldo Electrics llc',
    status: 'active',
    address: {
      country: 'united states',
      address_line_1: '1254 St. Pedro',
      city: 'Miami',
      state: 'Florida',
      zipcode: '33015',
    },
    default_contact: {
      name: 'Andrew Hoffman',
      phone: '1112223333',
      email: 'ahoffman@xyz.com',
    },
    contacts: [
      {
        name: 'Andrew Hoffman',
        phone: '1112223333',
        email: 'ahoffman@xyz.com',
      },
    ],
  },
  {
    _id: '125403',
    number: '125403',
    name: 'sonynuckles llc',
    status: 'active',
    address: {
      country: 'united states',
      address_line_1: '1254 St. Pedro',
      city: 'Miami',
      state: 'Florida',
      zipcode: '33015',
    },
    default_contact: {
      name: 'Andrew Hoffman',
      phone: '1112223333',
      email: 'ahoffman@xyz.com',
    },
    contacts: [
      {
        name: 'Andrew Hoffman',
        phone: '1112223333',
        email: 'ahoffman@xyz.com',
      },
    ],
  },
  {
    _id: '125404',
    number: '125404',
    name: 'JC Metalurgic llc',
    status: 'active',
    address: {
      country: 'united states',
      address_line_1: '1254 St. Pedro',
      city: 'Miami',
      state: 'Florida',
      zipcode: '33015',
    },
    default_contact: {
      name: 'Andrew Hoffman',
      phone: '1112223333',
      email: 'ahoffman@xyz.com',
    },
    contacts: [
      {
        name: 'Andrew Hoffman',
        phone: '1112223333',
        email: 'ahoffman@xyz.com',
      },
    ],
  },
  {
    _id: '125405',
    number: '125405',
    name: 'JC Wood works llc',
    status: 'active',
    address: {
      country: 'united states',
      address_line_1: '1254 St. Pedro',
      city: 'Miami',
      state: 'Florida',
      zipcode: '33015',
    },
    default_contact: {
      name: 'Andrew Hoffman',
      phone: '1112223333',
      email: 'ahoffman@xyz.com',
    },
    contacts: [
      {
        name: 'Andrew Hoffman',
        phone: '1112223333',
        email: 'ahoffman@xyz.com',
      },
    ],
  },
  {
    _id: '125406',
    number: '125406',
    name: 'Pearl jum llc',
    status: 'active',
    address: {
      country: 'united states',
      address_line_1: '1254 St. Pedro',
      city: 'Miami',
      state: 'Florida',
      zipcode: '33015',
    },
    default_contact: {
      name: 'Andrew Hoffman',
      phone: '1112223333',
      email: 'ahoffman@xyz.com',
    },
    contacts: [
      {
        name: 'Andrew Hoffman',
        phone: '1112223333',
        email: 'ahoffman@xyz.com',
      },
    ],
  },
  {
    _id: '125407',
    number: '125407',
    name: 'Logotrix llc',
    status: 'active',
    address: {
      country: 'united states',
      address_line_1: '1254 St. Pedro',
      city: 'Miami',
      state: 'Florida',
      zipcode: '33015',
    },
    default_contact: {
      name: 'Andrew Hoffman',
      phone: '1112223333',
      email: 'ahoffman@xyz.com',
    },
    contacts: [
      {
        name: 'Andrew Hoffman',
        phone: '1112223333',
        email: 'ahoffman@xyz.com',
      },
    ],
  },
  {
    _id: '125408',
    number: '125408',
    name: 'Mogoyo llc',
    status: 'active',
    address: {
      country: 'united states',
      address_line_1: '1254 St. Pedro',
      city: 'Miami',
      state: 'Florida',
      zipcode: '33015',
    },
    default_contact: {
      name: 'Andrew Hoffman',
      phone: '1112223333',
      email: 'ahoffman@xyz.com',
    },
    contacts: [
      {
        name: 'Andrew Hoffman',
        phone: '1112223333',
        email: 'ahoffman@xyz.com',
      },
    ],
  },
  {
    _id: '125409',
    number: '125409',
    name: 'Mengaya Corp.',
    status: 'active',
    address: {
      country: 'united states',
      address_line_1: '1254 St. Pedro',
      city: 'Miami',
      state: 'Florida',
      zipcode: '33015',
    },
    default_contact: {
      name: 'Andrew Hoffman',
      phone: '1112223333',
      email: 'ahoffman@xyz.com',
    },
    contacts: [
      {
        name: 'Andrew Hoffman',
        phone: '1112223333',
        email: 'ahoffman@xyz.com',
      },
    ],
  },
  {
    _id: '125410',
    number: '125410',
    name: 'UHC Centers llc',
    status: 'active',
    address: {
      country: 'united states',
      address_line_1: '1254 St. Pedro',
      city: 'Miami',
      state: 'Florida',
      zipcode: '33015',
    },
    default_contact: {
      name: 'Andrew Hoffman',
      phone: '1112223333',
      email: 'ahoffman@xyz.com',
    },
    contacts: [
      {
        name: 'Andrew Hoffman',
        phone: '1112223333',
        email: 'ahoffman@xyz.com',
      },
    ],
  },
  {
    _id: '125411',
    number: '125411',
    name: 'Martinez Distributors llc',
    status: 'active',
    address: {
      country: 'united states',
      address_line_1: '1254 St. Pedro',
      city: 'Miami',
      state: 'Florida',
      zipcode: '33015',
    },
    default_contact: {
      name: 'Andrew Hoffman',
      phone: '1112223333',
      email: 'ahoffman@xyz.com',
    },
    contacts: [
      {
        name: 'Andrew Hoffman',
        phone: '1112223333',
        email: 'ahoffman@xyz.com',
      },
    ],
  },
];

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
    const  id = {_id: Math.floor(Math.random()*20200000000000)+""};
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
*/

const _PREPARE_CUSTOMER_LIST_ = () => {
  let res: CustomerListItem[] = [];
  for (let c of __CUSTOMERS__) {
    res.push({
      _id: c._id,
      number: c.number,
      name: c.name,
      status: c.status,
    });
  }

  return res;
};

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
