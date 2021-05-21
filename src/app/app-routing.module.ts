import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenuComponent} from './components/menu/menu.component';
import {TopListComponent} from './components/top-list/top-list.component';
import {BeerDetailComponent} from './components/beer-detail/beer-detail.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';

const routes: Routes = [
  {path: '', component: TopListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: TopListComponent},
  {path: 'top-list', component: TopListComponent},
  {path: 'beer-detail', component: BeerDetailComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '**', component: MenuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
