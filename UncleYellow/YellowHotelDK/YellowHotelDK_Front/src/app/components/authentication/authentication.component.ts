import { Component, OnInit } from '@angular/core';
import {Users} from "../../models/users";
import {AuthService} from "../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  errorMessage:String="";
  successMessage:String="";
  username:any
  password:any
  constructor(
    private router:Router,
    private auth:AuthService
    ) {
  }

  ngOnInit(): void {

  }

  onSubmit(){
    this.auth.login(this.username,this.password).then((res:any) =>{
      this.auth.isLoggedIn;
      this.processResponse()
      this.router.navigate(['/adminManagement'])
    })
  }

  processResponse() {
    debugger
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      title: 'Sign In Success',
      icon: 'success',
    });
    // Swal.fire({
    //   toast: true,
    //   position: 'top-end',
    //   showConfirmButton: false,
    //   timer: 3000,
    //   timerProgressBar: true,
    //   title: 'Booking Room Fail',
    //   icon: 'error',
    // });
    // return
  }
}
