import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { RoomBookingService } from '../../../services/room-booking.service';
import * as moment from 'moment';
import { KindOfRoomService } from 'src/app/services/kindOfRoom.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'dialog-booking-room',
  templateUrl: './dialogBookingRoom.component.html',
  styleUrls: ['./dialogBookingRoom.component.css']
})
export class DialogBookingRoomComponent implements OnInit {
  name: any
  email: any
  phoneNumber: any
  description: any
  kindOfRoom: any
  checkInDate: any
  roomNumber: any
  kindOfRoomsl: any = "Kind Of Room"
  totalPrice: any
  checkOutDate: any
  isEdit: any = false
  item: any = {};
  itemKindOfRomm: any = {}
  emptyRoom: any;
  currentDate: any
  constructor(
    public dialogRef: MatDialogRef<DialogBookingRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public roomBooking: RoomBookingService,
    public kindOfRoomService: KindOfRoomService
  ) {
    if (data.kindOfRoom) {
      // data.kindOfRoom == this.kindOfRoom
      this.item.kindOfRoom = data.kindOfRoom
    }
    if (data.item) {
      debugger
      // Parse date string
      const momentInDate = moment(this.data.item.checkInDate, 'DD/MM/YYYY hh:mm:ss a');
      const momentOutDate = moment(this.data.item.checkOutDate, 'DD/MM/YYYY hh:mm:ss a');
      // Format to ISO string
      this.data.item.checkInDate = momentInDate.format('YYYY-MM-DD[T]HH:mm')
      this.data.item.checkOutDate = momentOutDate.format('YYYY-MM-DD[T]HH:mm')
      // this.kindOfRoom = this.data.item.kindOfRoom
      this.isEdit = true
      this.item = this.data.item
    }
  }

  ngOnInit(): void {
    this.currentDate = formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en-US');
    this.fetchKindOfRoom()
    this.checkRoomLeft()
  }

  fetchKindOfRoom() {
    this.kindOfRoomService.getKindOfRoom().subscribe((rs: any) => {
      this.itemKindOfRomm = rs
      debugger
      if (this.data.kindOfRoom == "Junior Suite") {
        this.emptyRoom = this.itemKindOfRomm[1].emptyRoom
      }
      if (this.data.kindOfRoom == "Executive Suite") {
        this.emptyRoom = this.itemKindOfRomm[2].emptyRoom
      }
      if (this.data.kindOfRoom == "Super Deluxe") {
        this.emptyRoom = this.itemKindOfRomm[0].emptyRoom
      }
    })
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
  onCheckInDateChange() {
    // this.item.kindOfRoom = this.kindOfRoom
    const dateIn = new Date(this.item.checkInDate);
    const dateOut = new Date(this.item.checkOutDate);

    // Tính số miliseconds giữa 2 ngày
    const diffTime = dateOut.getTime() - dateIn.getTime();

    // Chuyển sang số ngày
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    if (this.item.kindOfRoom == 'Junior Suite') {
      this.item.price = diffDays * 100 * this.item.roomNumber
    }
    if (this.item.kindOfRoom == 'Executive Suite') {
      this.item.price = diffDays * 200 * this.item.roomNumber
    }
    if (this.item.kindOfRoom == 'Super Deluxe') {
      this.item.price = diffDays * 300 * this.item.roomNumber
    }
  }
  save() {
    if (this.item.checkInDate > this.item.checkOutDate) {
      debugger
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
    if (!this.item.name || !this.item.email || !this.item.phoneNumber || !this.item.description || !this.item.kindOfRoom || !this.item.checkInDate || !this.item.checkOutDate || !this.item.roomNumber) {
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
    if(this.item.roomNumber > this.emptyRoom || this.emptyRoom == 0){
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: 'Room is sold out, please book another room',
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
        kindOfRoom: this.item.kindOfRoom,
        checkInDate: this.item.checkInDate,
        checkOutDate: this.item.checkOutDate,
        roomNumber: this.item.roomNumber,
        price: this.item.price,
        description: this.item.description,
        status: 1
      };
      if (this.isEdit) {
        this.roomBooking.updateBooking(this.item.id, roomBooking)
          .subscribe((res: any) => {
            // handle response
            debugger
            this.processResponse()
            this.dialogRef.close(res)
          });
      }

      else {
        this.roomBooking.createBooking(roomBooking).subscribe((rs: any) => {
          this.processResponse()
          return this.dialogRef.close()
        });
      }
      this.saveKindOfRoom()
    }
  }

  saveKindOfRoom(){
    debugger
    if(this.item.kindOfRoom == "Junior Suite"){
      const kindOfRoom = {
        id: "5d649407-4404-48b3-9a58-69c9e31bd5b0",
        name: this.item.kindOfRoom,
        totalRoom: this.itemKindOfRomm[1].totalRoom,
        emptyRoom: this.itemKindOfRomm[1].totalRoom - this.item.roomNumber,
        rentedRoom: this.itemKindOfRomm[1].rentedRoom + this.item.roomNumber
      }
      this.kindOfRoomService.updateKindOfRoom(kindOfRoom).subscribe(((rs:any) => {
        debugger
      }))
    }
    if(this.item.kindOfRoom == "Executive Suite"){
      const kindOfRoom = {
        id: "eeadddc0-7558-4b96-83eb-d32a540d742b",
        name: this.item.kindOfRoom,
        totalRoom: this.itemKindOfRomm[2].totalRoom,
        emptyRoom: this.itemKindOfRomm[2].totalRoom - this.item.roomNumber,
        rentedRoom: this.itemKindOfRomm[2].rentedRoom + this.item.roomNumber
      }
      this.kindOfRoomService.updateKindOfRoom(kindOfRoom).subscribe(((rs:any) => {

      }))
    }
    if(this.item.kindOfRoom == "Super Deluxe"){
      const kindOfRoom = {
        id: "9ddf4051-7444-4334-86ae-58514eee76b1",
        name: this.item.kindOfRoom,
        totalRoom: this.itemKindOfRomm[0].totalRoom,
        emptyRoom: this.itemKindOfRomm[0].totalRoom - this.item.roomNumber,
        rentedRoom: this.itemKindOfRomm[0].rentedRoom + this.item.roomNumber
      }
      this.kindOfRoomService.updateKindOfRoom(kindOfRoom).subscribe(((rs:any) => {

      }))
    }
  }
  checkRoomLeft(item?: any) {
    if (item == "Junior Suite") {
      this.emptyRoom = this.itemKindOfRomm[1].emptyRoom
    }
    if (item == "Executive Suite") {
      this.emptyRoom = this.itemKindOfRomm[2].emptyRoom
    }
    if (item == "Super Deluxe") {
      this.emptyRoom = this.itemKindOfRomm[0].emptyRoom
    }
    debugger
    this.emptyRoom = this.emptyRoom - this.item.roomNumber
  }
  cancel() {
    this.dialogRef.close()
  }

}
