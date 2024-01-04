import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) {

  }
  getUsers() {
    return this.http.get<any>('https://localhost:7156/api/Users');
  }
}
