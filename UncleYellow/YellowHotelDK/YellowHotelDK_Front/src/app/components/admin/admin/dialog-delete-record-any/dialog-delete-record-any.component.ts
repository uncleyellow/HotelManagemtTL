import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeesService } from 'src/app/services/employees.service';
import { LetterService } from 'src/app/services/letter.service';
import { RoomBookingService } from 'src/app/services/room-booking.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-delete-record-any',
  templateUrl: './dialog-delete-record-any.component.html',
  styleUrls: ['./dialog-delete-record-any.component.css']
})
export class DialogDeleteRecordAnyComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteRecordAnyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public usersService: UsersService,
    public roomBookingService: RoomBookingService,
    public employeesService: EmployeesService,
    public letterService: LetterService,

  ) {

  }

  ngOnInit(): void {

  }
  save() {
    if (this.data.deleteRoom) {
      this.roomBookingService.deleteBooking(this.data.item.id)
        .subscribe((rs: any) => {
          // handle response
          this.processResponse()
          this.dialogRef.close()
        });
    }
    if (this.data.deleteUsers) {
      this.usersService.deleteUser(this.data.item.id)
        .subscribe((res: any) => {
          // handle response
          this.processResponse()
          this.dialogRef.close()
        });
    }
    if (this.data.deleteEmployees) {
      this.employeesService.deleteEmployees(this.data.item.id)
        .subscribe((res: any) => {
          // handle response
          this.processResponse()
          this.dialogRef.close()
        });
    }
    if (this.data.deleteLetters) {
      this.letterService.deleteLetters(this.data.item.id)
        .subscribe((res: any) => {
          // handle response
          this.processResponse()
          this.dialogRef.close()
        });
    }
  }
  cancel() {
    this.dialogRef.close()
  }
  processResponse() {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      title: 'Delete Sucess',
      icon: 'success',
    });
  }
}
