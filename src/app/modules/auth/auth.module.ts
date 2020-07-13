import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
// App
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthSuccessComponent } from './auth-success/auth-success.component';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [LoginComponent, AuthSuccessComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // Angular Material
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  exports: [LoginComponent, AuthSuccessComponent],
  providers: [AuthService],
})
export class AuthModule {}
