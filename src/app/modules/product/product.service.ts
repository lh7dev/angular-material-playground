import { Injectable } from '@angular/core';
import {
  ApiResponse,
  Entity,
  EntityListData,
  GenericEndpoints,
} from 'src/app/shared/Abstracts/shared.interfaces';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable } from 'rxjs';
import { ProductListItem } from 'src/app/shared/Abstracts/product.interface';
import { EntityService } from 'src/app/shared/Abstracts/entity-service.class';
import { DummyDataService } from 'src/app/shared/testing/dummy-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends EntityService {
  endpoints: GenericEndpoints;

  constructor(
    private httpService: HttpClient,
    private authService: AuthService,
    private dummyDataService: DummyDataService,
    private snackbarService: MatSnackBar
  ) {
    super(httpService, authService, dummyDataService, snackbarService);
  }

  getList(): Observable<ApiResponse> {
    return this.dummyDataService.productList();
  }
}

// API ENDPOINT
const endpoints = {
  list: '/product',
  details: '/product/details',
  openEdit: '/product/details',
  applyEdit: '/product/update',
  applyNew: '/product/new',
  delete: '/product/delete',
};
