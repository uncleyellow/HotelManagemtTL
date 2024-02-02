import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  statusLink: any
  constructor(
    public router: Router
  ) {

  }

  ngOnInit(): void {
    this.statusLink = 1
  }
  routerLink(item: any) {
    debugger
    if (item == 'Users') {
      this.statusLink = 1
    }
    if (item == 'Rooms Booking') {
      this.statusLink = 2
    }
    if (item == 'Employees') {
      this.statusLink = 3
    }
    if (item == 'Letter') {
      this.statusLink = 4
    }
    if (item == 'Rooms') {
      this.statusLink = 5
    }
    else {
      return
    }
  }
  logOut(){
    this.processResponse()
    this.router.navigate(['/admin'])
  }
  processResponse() {
    debugger
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      title: 'Sign Out Success',
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
