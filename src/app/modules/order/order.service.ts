import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/shared/Abstracts/entity-service.class';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DummyDataService } from 'src/app/shared/testing/dummy-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ApiResponse, Entity } from 'src/app/shared/Abstracts/shared.interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends EntityService {

  constructor(private httpService: HttpClient,
    private authService: AuthService,
    private dummyDataService: DummyDataService,
    private snackbarService: MatSnackBar) {
      super(httpService, authService, dummyDataService, snackbarService);
  }
  getList(){
    return this.dummyDataService.orderList();
  }

  getDetails(data: Entity): Observable<ApiResponse>{
    return this.dummyDataService.orderDetails(data);
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
