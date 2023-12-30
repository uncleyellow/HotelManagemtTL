import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticationComponent} from "./components/authentication/authentication.component";
import {SignupComponent} from "./components/signup/signup.component";
import {HomeComponent} from "./components/home/home.component";
import { AdminComponent } from './components/admin/admin/admin.component';


const routes: Routes = [
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"login",
    component:AuthenticationComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"admin",
    component:AdminComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
