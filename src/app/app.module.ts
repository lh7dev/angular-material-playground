import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { DefaultModule } from './layouts/default/default.module';
import { UserStateComponent } from './modules/shared/components/user-state/user-state.component';

@NgModule({
  declarations: [AppComponent, UserStateComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // Material Modules
    MatButtonModule,
    // dashboard modules
    DefaultModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
