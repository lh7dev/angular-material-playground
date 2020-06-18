import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthHeader(): HttpHeaders | null{
    if (localStorage.getItem("sessionToken") != null) {
      const token = localStorage.getItem("sessionToken");
      console.log(token)
      // if the token is  stored in localstorage add it to http header
      return new HttpHeaders().set("access-token", token);
      //clone http to the custom AuthRequest and send it to the server
    } else {
      return null
    }
  }
}
