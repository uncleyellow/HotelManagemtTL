import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBookingRoomComponent } from './dialogBookingRoom/dialogBookingRoom.component';
import { LetterService } from '../../services/letter.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { KindOfRoomService } from 'src/app/services/kindOfRoom.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name:any
  email:any
  phone:any
  description:any
  isLoggedIn = false;
  user_name ="";
  aboutUs:any
  itemKindOfRomm:any = {}
  constructor(
    public dialog: MatDialog,
    public letter:LetterService,
    private router:Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    public kindOfRoomService: KindOfRoomService
  ){

  }

  ngOnInit(): void {
    const fragment = this.route.snapshot.fragment;
    this.isLoggedIn == this.authService.isLoggedIn;
    this.fetch()
    this.fetchKindOfRoom()
  }

  fetch() {

  }

  bookingRoom(item?:any) {
    const dialogRef = this.dialog.open(DialogBookingRoomComponent,{
      panelClass: 'bg-color', // Add your custom panel class
      data:{
        title: "Booking Room",
        kindOfRoom: item
      }
    });

    dialogRef.afterClosed().subscribe((rs:any) =>{
      this.fetchKindOfRoom()
    } );
  }

  sendLetter(){
    debugger
    const roomBooking = {
      name: this.name,
      email: this.email,
      phoneNumber: this.phone,
      description: this.description,
      sentDate: new Date()
    };
    this.letter.createLetter(roomBooking).subscribe((rs: any) => {
      // this.processResponse()
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: 'Send Letter Success',
        icon: 'success',
      });
    });
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
  logout() {
    this.authService.logout();
    debugger
    this.isLoggedIn == false
    this.router.navigate(['/home'])
  }
  scrollToDiv(id: string) {

    const element = document.getElementById(id);

    if(element) {

      element.scrollIntoView({
        behavior: 'smooth'
      });

    } else {
      console.log('Element not found');
    }

  }
  fetchKindOfRoom() {
    this.kindOfRoomService.getKindOfRoom().subscribe((rs: any) => {
      debugger
      this.itemKindOfRomm = rs
    })
  }

}
