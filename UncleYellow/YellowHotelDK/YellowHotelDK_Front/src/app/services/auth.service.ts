import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Users} from "../models/users";
import {BehaviorSubject, catchError, Observable, of, tap, throwError} from "rxjs";
import {IdToken} from "../models/id-token";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = false;
  constructor(
    private http: HttpClient
  ){

  }
  login(username: string, password: string) {
    return this.http.get<any>(
      'https://localhost:7156/api/Users',
      {
        headers: {
          'Accept': '*/*'
        }
      }
    )
    .toPromise()
    .then(response => {

      // kiểm tra xác thực
      const user = response.find((u:any) => {
        return u.userName === username && u.passWord === password
      });
      debugger
      if(user) {
        // Đăng nhập thành công
        this.isLoggedIn = true;
      } else {
        // Sai tài khoản hoặc mật khẩu
        throw new Error('Sai tài khoản hoặc mật khẩu');
      }
      return user;

    });

  }

  logout() {
    this.isLoggedIn = false;
  }

  isUserLoggedIn() {
    return this.isLoggedIn;
  }

}
