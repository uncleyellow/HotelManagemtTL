import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBookingRoomComponent } from 'src/app/components/home/dialogBookingRoom/dialogBookingRoom.component';
import { RoomBookingService } from '../../../../services/room-booking.service';
import { DialogDeleteRecordAnyComponent } from '../dialog-delete-record-any/dialog-delete-record-any.component';
import { DialogRoomStatusComponent } from './dialog-room-status/dialog-room-status.component';

@Component({
  selector: 'app-booking-room-management',
  templateUrl: './bookingRoomMangement.component.html',
  styleUrls: ['./bookingRoomManagement.component.css'],
})
export class BookingRoomManagementComponent implements OnInit {
  items: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  date:any
  searchParam:any
  constructor(
    public roomBookingService: RoomBookingService,
    public dialog: MatDialog,

  ){

  }


  ngOnInit(): void {
    this.fetch()
  }

  fetch(){
    this.roomBookingService.getBookings().subscribe((rs:any) =>{
      this.items = rs
    })
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.fetch();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetch();
  }
  edit(item: any) {
    const dialogRef = this.dialog.open(DialogBookingRoomComponent, {
      panelClass: 'bg-color', // Add your custom panel class
      data: {
        title: "Edit Booking Room",
        item: item
      }
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.fetch()
    });
  }
  delete(item: any) {
    const dialogRef = this.dialog.open(DialogDeleteRecordAnyComponent, {
      panelClass: 'bg-color', // Add your custom panel class
      data: {
        deleteRoom:true,
        title: "Delete Booking Room",
        item: item
      }
    });

    dialogRef.afterClosed().subscribe(
      (result:any) => {
        this.fetch()
      }
    );
  }
  addUsers() {
    const dialogRef = this.dialog.open(DialogBookingRoomComponent, {
      panelClass: 'bg-color', // Add your custom panel class
      data: {
        title: "Add Booking Room",
      }
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.fetch()
    });
  }
  search(keyword?: any){
    if(!keyword){
      this.fetch()
    }
    if(isNaN(keyword)){
      this.roomBookingService.searchRooms(keyword)
      .subscribe(users => {
        debugger
        this.items = users;
      });
    }
    else{
      this.roomBookingService.searchRoomsByPhone(keyword)
      .subscribe(users => {
        debugger
        this.items = users;
      });
    }
  }
  status(item:any,status:any){
    if(status == 1){
      const dialogRef = this.dialog.open(DialogRoomStatusComponent, {
        panelClass: 'bg-color', // Add your custom panel class
        data: {
          title: "Decline Booking Room",
          item: item,
          status : 1
        }
      });

      dialogRef.afterClosed().subscribe((result:any) => {
        debugger
        if(result){
          this.fetch()
        }
      });
    }
    else{
      const dialogRef = this.dialog.open(DialogRoomStatusComponent, {
        panelClass: 'bg-color', // Add your custom panel class
        data: {
          title: "Comfront Booking Room",
          item: item,
          status : 2
        }
      });

      dialogRef.afterClosed().subscribe((result:any) => {
        if(result){
          this.fetch()
        }
      });
    }
  }
}
