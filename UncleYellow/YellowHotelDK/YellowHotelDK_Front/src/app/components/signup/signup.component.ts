import { Component, OnInit } from '@angular/core';
import {Users} from "../../models/users";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user:Users;
  confirmPassword!:String;
  role:String="CLIENT";
  errorMessage:String="";
  successMessage:String="";

  constructor(private authService:AuthService,private router:Router) {
    this.user = new Users();
  }

  ngOnInit(): void {
  }

}
