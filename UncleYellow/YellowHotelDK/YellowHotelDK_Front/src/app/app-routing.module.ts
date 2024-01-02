import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticationComponent} from "./components/authentication/authentication.component";
import {SignupComponent} from "./components/signup/signup.component";
import {HomeComponent} from "./components/home/home.component";
import { AdminComponent } from './components/admin/admin/admin.component';
import { BookingRoomManagementComponent } from './components/admin/admin/bookingRoomManagement/bookingRoomManagement.component';
import { EmployeesManagementComponent } from './components/admin/admin/employees-management/employees-management.component';
import { LetterContactComponent } from './components/admin/admin/letterContact/letterContact.component';
import { UsersManagementComponent } from './components/admin/admin/users-management/users-management.component';


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
    path:"admin",
    component:AuthenticationComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"adminManagement",
    component:AdminComponent
  },
  {
    path:"bookingRoomManagement",
    component:BookingRoomManagementComponent
  },
  {
    path:"employeesManagement",
    component:EmployeesManagementComponent
  },
  {
    path:"letterManagement",
    component:LetterContactComponent
  },
  {
    path:"usersManagement",
    component:UsersManagementComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
