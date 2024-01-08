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
  isEdit:any = false
  item: any = {};
  constructor(
    public dialogRef: MatDialogRef<DialogBookingRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public roomBooking: RoomBookingService
  ) {
    if (data.kindOfRoom) {
      data.kindOfRoom == this.kindOfRoom
    }
    if(data.item){
      debugger
      this.item = this.data.item
      this.isEdit = true
    }
  }

  ngOnInit(): void {
    debugger
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
    debugger
    const dateIn = new Date(this.item.checkInDate);
    const dateOut = new Date(this.item.checkOutDate);

    // Tính số miliseconds giữa 2 ngày
    const diffTime = dateOut.getTime() - dateIn.getTime();

    // Chuyển sang số ngày
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    if(this.item.kindOfRoom == 'Junior Suite'){
      this.item.totalPrice = diffDays * 100 * this.item.roomNumber
    }
    if(this.item.kindOfRoom == 'Executive Suite'){
      this.item.totalPrice = diffDays * 200 * this.item.roomNumber
    }
    if(this.item.kindOfRoom == 'Super Deluxe'){
      this.item.totalPrice = diffDays * 300 * this.item.roomNumber
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
    if (!this.item.name || !this.item.email || !this.item.phoneNumber || !this.item.descriptions || !this.item.kindOfRoom || !this.item.checkInDate || !this.item.checkOutDate || !this.item.roomNumber) {
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
      debugger
      const roomBooking = {
        name: this.item.name,
        email: this.item.email,
        phoneNumber: this.item.phoneNumber,
        kindOfRoom: this.kindOfRoom,
        checkInDate: this.item.checkInDate,
        checkOutDate: this.item.checkOutDate,
        roomNumber: this.item.roomNumber,
        price: this.item.totalPrice,
        description: this.item.descriptions,
        status:1
      };
      if(this.isEdit){
        debugger
        this.roomBooking.updateBooking(this.item.id,roomBooking)
        .subscribe((res: any) => {
          // handle response
          debugger
          this.processResponse()
          this.dialogRef.close(res)
        });
      }
      else{
        debugger
        this.roomBooking.createBooking(roomBooking).subscribe((rs: any) => {
          this.processResponse()
          return this.dialogRef.close()
        });
      }
    }
  }

  cancel() {
    this.dialogRef.close()
  }

}
