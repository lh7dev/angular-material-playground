import { Injectable } from '@angular/core';
import { Business } from '../Abstracts/business.interface';
import { getMaxListeners } from 'process';
import { ApiResponse } from '../Abstracts/shared.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  constructor() {}

  businessInfo(): Observable<ApiResponse> {
    return new Observable<ApiResponse>((observer) => {
      const response = this.toResponse(BUSINESS);
      observer.next(response);
    });
  }

  private toResponse(data:Business) {
    return {
      success: true,
      data: data,
    };
  }
}

const BUSINESS: Business = {
  name: 'Mambi Software LLC',
  address: {
    address_line_1: '2565 Tedford Dr.',
    address_line_2: 'STE 45-B',
    city: 'Whittier',
    state: 'CA',
    zipcode: '90354',
    country: 'United States',
  },
  phone: '7863064560',
  email: 'lh7dev@getMaxListeners.com',
};
