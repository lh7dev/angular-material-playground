import {
  iEntityService,
  ApiResponse,
  Entity,
  GenericEndpoints,
} from 'src/app/shared/Abstracts/shared.interfaces';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable } from 'rxjs';
import { DummyDataService } from '../testing/dummy-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export abstract class EntityService implements iEntityService {
  private backendUrl = environment.apiUrl;
  endpoints: GenericEndpoints | null;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private dummyData: DummyDataService,
    private snackbar: MatSnackBar,
  ) {}

  getList(): Observable<ApiResponse> {
    const url = this.backendUrl + this.endpoints.list;
    //return this.http.get<any>(url);
    console.log('requesting products list from: ' + url);
    const authHeader = this.auth.getAuthHeader();
    return this.http.get<ApiResponse>(url, { headers: authHeader });
  }

  getDetails(
    entity: Entity
  ): Observable<ApiResponse> {
    const url = this.backendUrl + this.endpoints.details;
    //return this.http.get<any>(url);
    console.log('requesting products list from: ' + url);
    const authHeader = this.auth.getAuthHeader();
    return this.http.post<ApiResponse>(url, entity, { headers: authHeader });
  }

  getNew(): Observable<ApiResponse> {
    throw new Error('Method not implemented.');
  }

  applyNew(formData: object): Observable<ApiResponse> {
    const url = this.backendUrl + this.endpoints.applyNew;
    //return this.http.get<any>(url);
    console.log('requesting products list from: ' + url);
    const authHeader = this.auth.getAuthHeader();
    return this.http.post<ApiResponse>(url, formData, { headers: authHeader });
  }

  applyEdit(entityData: Entity): Observable<ApiResponse> {
    throw new Error('Method not implemented.');
    /*
    const url = this.backendUrl + this.endpoints.applyEdit;
    console.log('requesting products list from: ' + url);
    const authHeader = this.auth.getAuthHeader();
    return this.http.post<ApiResponse>(url, entityData, { headers: authHeader });
    */
  }

  delete(entities: Entity[]): Observable<ApiResponse> {
    throw new Error('Method not implemented.');
    /*
    const url = this.backendUrl + this.endpoints.delete;
    //return this.http.get<any>(url);
    console.log('requesting products list from: ' + url);
    const authHeader = this.auth.getAuthHeader();
    return this.http.post<ApiResponse>(url, entities, { headers: authHeader });
    */
  }

  notify(msg: string, delay?: number) {
    if (delay !== undefined) {
      this.snackbar.open(msg, null, { duration: delay });
    } else {
      this.snackbar.open(msg, null, { duration: 2000 });
    }
  }
}
