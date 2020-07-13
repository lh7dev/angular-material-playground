import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  AuthService,
  UserDisplayDetails,
} from 'src/app/modules/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() navigation = new EventEmitter<any>();
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onNavigation() {
    this.navigation.emit();
  }

  get isAuth$(): boolean {
    return this.auth.authenticated$;
  }

  get userDetails$(): UserDisplayDetails {
    return this.auth.userDisplayDetails$;
  }

  signOut(): void {
    this.auth.logout().subscribe((result) => {
      this.router.navigate(['/auth']);
    });
  }
}
