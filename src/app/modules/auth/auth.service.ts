import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  get authenticated$(): boolean {
    const authSign = localStorage.getItem('id');
    return authSign === undefined || authSign === null ? false : true;
  }
  get userDisplayDetails$(): UserDisplayDetails {
    return {
      name: localStorage.getItem('displayName'),
      avatarImgUrl: localStorage.getItem('pictureURL'),
    };
  }

  getAuthHeader(): HttpHeaders | null {
    if (localStorage.getItem('sessionToken') != null) {
      const token = localStorage.getItem('sessionToken');
      console.log(token);
      // if the token is  stored in localstorage add it to http header
      return new HttpHeaders().set('access-token', token);
      //clone http to the custom AuthRequest and send it to the server
    } else {
      this.router.navigate(['/auth']);
    }
  }

  set Session(object: SessionObject) {
    this.setSession(object);
  }

  logout() {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('sessionToken');
    localStorage.clear();
    //document.cookie = 'express:sess'+ '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    //document.cookie = 'express:sess.sig'+ '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    const endpoint = '/auth/logout';
    return this.http.post(URL + endpoint, { id: id });
  }

  private setSession(object: SessionObject) {
    console.log('setting session');
    console.log(object);
    localStorage.setItem('id', object.id);
    localStorage.setItem('googleId', object.googleId);
    localStorage.setItem('displayName', object.displayName);
    localStorage.setItem('pictureURL', object.pictureURL);
    localStorage.setItem('sessionToken', object.sessionToken);
  }
}

export interface SessionObject {
  id?: string;
  googleId: string;
  displayName: string;
  pictureURL: string;
  sessionToken: string;
}

export interface UserDisplayDetails {
  name: string;
  avatarImgUrl: string;
}
const URL = 'http://localhost:4200/backend';
