import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-room-management',
  templateUrl: './bookingRoomMangement.component.html',
  styleUrls: ['./bookingRoomManagement.component.css'],
})
export class BookingRoomManagementComponent implements OnInit {
  constructor(

  ){

  }


  ngOnInit(): void {
    this.fetch()
  }
  fetch(){

  }
}
