import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'dialog-booking-room',
  templateUrl: './dialogBookingRoom.component.html',
  styleUrls: ['./dialogBookingRoom.component.css']
})
export class DialogBookingRoomComponent implements OnInit {
  name:any
  email:any
  phoneNumber:any
  descriptions:any
  kindOfRoom:any
  constructor(
    public dialogRef: MatDialogRef<DialogBookingRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  ngOnInit(): void {

  }

  processResponse() {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      title: 'Booking Room Sucess',
      icon: 'success',
    });
    // Swal.fire({
    //   toast: true,
    //   position: 'top-end',
    //   showConfirmButton: false,
    //   timer: 3000,
    //   timerProgressBar: true,
    //   title: 'Booking Room Fail',
    //   icon: 'error',
    // });
    // return
  }

  save() {
    this.name
    this.email
    this.phoneNumber
    this.descriptions
    this.kindOfRoom
    this.processResponse()
  }

  cancel() {
    this.dialogRef.close()
  }

}
