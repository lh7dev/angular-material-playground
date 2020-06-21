import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewStateService {

  private SIDENAV_STATE_KEY = "isMenuOpen";

  constructor() {
    let state = (localStorage.getItem(this.SIDENAV_STATE_KEY)==undefined) ? "true" : localStorage.getItem(this.SIDENAV_STATE_KEY);
    localStorage.setItem(this.SIDENAV_STATE_KEY, state);
  }

  get IsMenuOpen() {
    let state = localStorage.getItem(this.SIDENAV_STATE_KEY);
    return (state == "true");
  }

  set IsMenuOpen(state) {
    localStorage.setItem(this.SIDENAV_STATE_KEY, state.toString());
  }
}
