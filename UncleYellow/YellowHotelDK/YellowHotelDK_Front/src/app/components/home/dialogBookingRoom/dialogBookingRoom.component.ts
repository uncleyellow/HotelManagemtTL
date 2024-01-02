import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { RoomBookingService } from '../../../services/room-booking.service';

@Component({
  selector: 'dialog-booking-room',
  templateUrl: './dialogBookingRoom.component.html',
  styleUrls: ['./dialogBookingRoom.component.css']
})
export class DialogBookingRoomComponent implements OnInit {
  name: any
  email: any
  phoneNumber: any
  descriptions: any
  kindOfRoom: any
  checkInDate: any
  roomNumber: any
  kindOfRoomsl: any = "Kind Of Room"
  totalPrice: any
  checkOutDate: any
  constructor(
    public dialogRef: MatDialogRef<DialogBookingRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public roomBooking: RoomBookingService
  ) {
    if (data.kindOfRoom) {
      data.kindOfRoom == this.kindOfRoom
    }
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
  onCheckInDateChange(){
    const dateIn = new Date(this.checkInDate);
    const dateOut = new Date(this.checkOutDate);

    // Tính số miliseconds giữa 2 ngày
    const diffTime = dateOut.getTime() - dateIn.getTime();

    // Chuyển sang số ngày
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    if(this.data.kindOfRoom == 'Junior Suite'){
      this.totalPrice = diffDays * 100 * this.roomNumber
    }
    if(this.data.kindOfRoom == 'Executive Suite'){
      this.totalPrice = diffDays * 200 * this.roomNumber
    }
    if(this.data.kindOfRoom == 'Super Deluxe'){
      this.totalPrice = diffDays * 300 * this.roomNumber
    }
  }
  save() {
    debugger
    if (this.checkInDate > this.checkOutDate) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: 'Check In Date Cannt Bigger than Check Out Date',
        icon: 'error',
      });
      return
    }
    if (!this.name || !this.email || !this.phoneNumber || !this.descriptions || !this.data.kindOfRoom || !this.checkInDate || !this.checkOutDate || !this.roomNumber) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: 'You have to write all flied in booking form',
        icon: 'error',
      });
      return
    }
    else {
      const roomBooking = {
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
        kindOfRoom: this.data.kindOfRoom,
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
        roomNumber: this.roomNumber,
        price: this.totalPrice,
        description: this.descriptions,
        status:1
      };
      this.roomBooking.createBooking(roomBooking).subscribe((rs: any) => {
        this.processResponse()
        return this.dialogRef.close()
      });
    }
  }

  cancel() {
    this.dialogRef.close()
  }

}
