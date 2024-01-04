import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { AuthenticationComponent } from './components/authentication/authentication.component';
import {NgxPaginationModule} from "ngx-pagination";
import {JWT_OPTIONS, JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {AuthService} from "./services/auth.service";
// import { SignupComponent } from './components/signup/signup.component';
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";
import {HomeComponent} from "./components/home/home.component";
import {FooterComponent} from "./components/footer/footer.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SignupComponent } from './components/signup/signup.component';
import { DialogBookingRoomComponent } from './components/home/dialogBookingRoom/dialogBookingRoom.component';
import { EmployeesManagementComponent } from './components/admin/admin/employees-management/employees-management.component';
import { UsersManagementComponent } from './components/admin/admin/users-management/users-management.component';
import { LetterContactComponent } from './components/admin/admin/letterContact/letterContact.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { BookingRoomManagementComponent } from './components/admin/admin/bookingRoomManagement/bookingRoomManagement.component';
import { DialogEditUsersComponent } from './components/admin/admin/users-management/dialog-edit-users/dialog-edit-users.component';
import { DialogDeleteRecordAnyComponent } from './components/admin/admin/dialog-delete-record-any/dialog-delete-record-any.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    SignupComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    DialogBookingRoomComponent,
    AdminComponent,
    BookingRoomManagementComponent,
    EmployeesManagementComponent,
    LetterContactComponent,
    UsersManagementComponent,
    DialogEditUsersComponent,
    DialogDeleteRecordAnyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useValue: {
          tokenGetter: () => {
            // return the access token from storage
            return localStorage.getItem('access_token');
          },
          // other options you want to pass to the JWT module
        }
      }
    }),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
