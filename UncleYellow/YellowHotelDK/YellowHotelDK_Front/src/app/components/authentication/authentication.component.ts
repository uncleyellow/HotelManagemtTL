import { Component, OnInit } from '@angular/core';
import {Users} from "../../models/users";
import {AuthService} from "../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";

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
      debugger
      this.auth.isLoggedIn;
      this.router.navigate(['/'])
    })
  }
}
