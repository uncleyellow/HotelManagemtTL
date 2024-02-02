import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KindOfRoomService {
  url = 'https://localhost:7156/api/kindOfRoom'
  constructor(
    private http: HttpClient
  ) {

  }
  getKindOfRoom() {
    return this.http.get<any>(this.url);
  }

  createKindOfRoom(user:any) {
    return this.http.post(this.url, user);
  }

  updateKindOfRoom(user:any) {
    return this.http.put(this.url, user);
  }

  deleteKindOfRoom(id: string) {
    return this.http.delete(`https://localhost:7156/api/kindOfRoom/${id}`, {
      headers: {
        'Accept': '*/*'
      }
    });
  }
}
