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
}
