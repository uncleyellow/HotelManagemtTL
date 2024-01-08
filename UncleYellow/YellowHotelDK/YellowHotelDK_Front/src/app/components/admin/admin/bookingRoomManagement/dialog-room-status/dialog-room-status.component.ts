import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomBookingService } from 'src/app/services/room-booking.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-dialog-room-status',
  templateUrl: './dialog-room-status.component.html',
  styleUrls: ['./dialog-room-status.component.css']
})
export class DialogRoomStatusComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogRoomStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public usersService: RoomBookingService

  ) {
    debugger
    // const inputInDate = this.data.item.checkOutDate;
    // const inputOutDate = this.data.item.checkOutDate;

    // // Convert to moment object
    // const momentInDate = moment(inputInDate, 'DD/MM/YYYY hh:mm:ss A');
    // const momentOutDate = moment(inputOutDate, 'DD/MM/YYYY hh:mm:ss A');

    // // Convert to ISO 8601 format
    // const outputInDate = momentInDate.format();
    // const outputOutDate = momentOutDate.format();
    // Parse date string
    const momentInDate = moment(this.data.item.checkInDate, 'DD/MM/YYYY hh:mm:ss a');
    const momentOutDate = moment(this.data.item.checkOutDate, 'DD/MM/YYYY hh:mm:ss a');
    // Format to ISO string
    this.data.item.checkInDate = momentInDate.format('YYYY-MM-DD[T]HH:mm')
    this.data.item.checkOutDate = momentOutDate.format('YYYY-MM-DD[T]HH:mm')
    // this.kindOfRoom = this.data.item.kindOfRoom
    // this.data.item.checkInDate = outputInDate
    // this.data.item.checkOutDate = outputOutDate

  }

  ngOnInit(): void {

  }

  save(item?: any) {
    debugger
    this.data.item.status = this.data.status

    const user = {
      // id: this.data.item.id,
      name: this.data.item.name,
      email: this.data.item.email,
      phoneNumber: this.data.item.phoneNumber,
      checkInDate: this.data.item.checkInDate,
      checkOutDate: this.data.item.checkOutDate,
      kindOfRoom: this.data.item.kindOfRoom,
      roomNumber: this.data.item.roomNumber,
      price: this.data.item.price,
      description: this.data.item.description,
      status: this.data.item.status,
    }
    this.usersService.updateBooking(this.data.item.id, user)
      .subscribe((res: any) => {
        // handle response
        debugger
        this.processResponse()
        this.dialogRef.close(res)
      });
  }
  cancel() {
    this.dialogRef.close()
  }
  processResponse() {
    if (this.data.item.status == 1) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: 'Not Comfront Sucess',
        icon: 'success',
      });
    }
    else {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: 'Comfront Sucess',
        icon: 'success',
      });
    }
  }
}
