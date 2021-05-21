import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {MenuComponent} from './components/menu/menu.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserMenuComponent} from './components/user-menu/user-menu.component';
import {TopListComponent} from './components/top-list/top-list.component';
import {BeerDetailComponent} from './components/beer-detail/beer-detail.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {LoginComponent} from './components/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UserMenuComponent,
    TopListComponent,
    BeerDetailComponent,
    UserProfileComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
