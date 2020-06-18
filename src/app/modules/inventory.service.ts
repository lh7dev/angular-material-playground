import { Injectable } from '@angular/core';
import {
  GenericEndpoints,
  ApiResponse,
} from '../shared/Abstracts/shared.interfaces';
import { EntityService } from '../shared/Abstracts/entity-service.class';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../shared/services/auth.service';
import { DummyDataService } from '../shared/testing/dummy-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryService extends EntityService {
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
    return this.dummyDataService.inventoryList();
  }
}
