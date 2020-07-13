import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-success',
  templateUrl: './auth-success.component.html',
  styleUrls: ['./auth-success.component.scss'],
})
export class AuthSuccessComponent implements OnInit {
  sessionStr;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      console.log(param);
      const session = JSON.parse(param.session);
      console.log(session);
      console.log(session.id);
      this.auth.Session = session.id;
      // In a real app: dispatch action to load the details here.
      this.router.navigate(['/']);
    });
  }
}
