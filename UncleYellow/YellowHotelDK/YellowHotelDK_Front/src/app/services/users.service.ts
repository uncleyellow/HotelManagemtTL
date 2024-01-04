import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'https://localhost:7156/api/Users'
  constructor(
    private http: HttpClient
  ) {

  }
  getUsers() {
    return this.http.get<any>(this.url);
  }

  createUser(user:any) {
    return this.http.post(this.url, user);
  }

  updateUser(user:any) {
    return this.http.put(this.url, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`https://localhost:7156/api/Users/${id}`, {
      headers: {
        'Accept': '*/*'
      }
    });
  }

  searchUsers(keyword: string) {
    return this.http.get<any>(
      `https://localhost:7156/api/Users/search`,
      {
        params: {
          keyword
        }
      }
    );
  }
}
