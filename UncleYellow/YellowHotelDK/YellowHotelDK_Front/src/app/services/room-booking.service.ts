import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomBookingService {

  constructor(
    private http: HttpClient
  ) {

  }

  createBooking(booking:any) {
    return this.http.post(
      'https://localhost:7156/api/RoomBooking',
      booking
    );
  }

  getBookings() {
    return this.http.get<any>('https://localhost:7156/api/RoomBooking');
  }
  searchRooms(keyword: string) {
    return this.http.get<any>(
      `https://localhost:7156/api/RoomBooking/search`,
      {
        params: {
          keyword
        }
      }
    );
  }
  searchRoomsByPhone(keyword: string) {
    return this.http.get<any>(
      `https://localhost:7156/api/RoomBooking/searchByPhone`,
      {
        params: {
          keyword
        }
      }
    );
  }
  updateStatusRoom(room:any) {
    debugger
    return this.http.put(`https://localhost:7156/api/RoomBooking`, room);
  }
}
