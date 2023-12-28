import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBookingRoomComponent } from './dialogBookingRoom/dialogBookingRoom.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ){

  }

  ngOnInit(): void {
    this.fetch()
  }

  fetch() {

  }

  bookingRoom() {
    const dialogRef = this.dialog.open(DialogBookingRoomComponent,{
      data:{
        title: "Booking Room"
      }
    });

    dialogRef.afterClosed().subscribe();
  }
}
