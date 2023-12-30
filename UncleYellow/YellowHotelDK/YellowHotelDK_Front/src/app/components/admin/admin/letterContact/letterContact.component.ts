import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'letter-contact',
  templateUrl: './letterContact.component.html',
  styleUrls: ['./letterContact.component.css']
})
export class DialogBookingRoomComponent implements OnInit {
  name:any
  email:any
  phoneNumber:any
  descriptions:any
  kindOfRoom:any
  constructor(
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


}
