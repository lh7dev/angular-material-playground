import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {
  ApiResponse,
  EntityListData,
  Entity,
  GenericEndpoints,
  Contact,
} from 'src/app/shared/Abstracts/shared.interfaces';
import { CustomerListItem } from 'src/app/shared/Abstracts/customer.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EntityService } from 'src/app/shared/Abstracts/entity-service.class';
import { DummyDataService } from 'src/app/shared/testing/dummy-data.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends EntityService {
  endpoints: GenericEndpoints;

  constructor(
    private httpService: HttpClient,
    private authService: AuthService,
    private dummyDataService: DummyDataService,
    private snackbarService: MatSnackBar
  ) {
    super(httpService, authService, dummyDataService, snackbarService);
  }

  getList(){
    return this.dummyDataService.customerList();
  }

  getDetails(data: Entity): Observable<ApiResponse>{
    return this.dummyDataService.customerDetails(data);
  }

  applyNew(data):Observable<ApiResponse>{
    return this.dummyDataService.applyNew(data);
  }

  applyEdit(data):Observable<ApiResponse>{
    return new Observable<ApiResponse>((observer) => {
      console.log('updating data... not really');
      observer.next({success: true});
    });
  }

  addContact(contact:Contact) {
    return new Observable<ApiResponse>((observer) => {
      console.log('adding contact... not really');
      observer.next({success: true});
    });
  }
}


// API ENDPOINT
const endpoints = {
  list: '/customer',
  details: '/customer/details',
  openEdit: '/customer/details',
  applyEdit: '/customer/update',
  applyNew: '/customer/new',
  delete: '/customer/delete',
};
