import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { LetterService } from 'src/app/services/letter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-letter',
  templateUrl: './edit-letter.component.html',
  styleUrls: ['./edit-letter.component.css']
})
export class EditLetterComponent implements OnInit {
  name: any
  email: any
  phoneNumber: any
  description: any
  kindOfRoom: any
  checkInDate: any
  roomNumber: any
  totalPrice: any
  checkOutDate: any
  isEdit: any = false
  item: any = {};
  constructor(
    public dialogRef: MatDialogRef<EditLetterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public letterService: LetterService,
  ) {
    if (data.item) {
      debugger
      // Parse date string
      const momentInDate = moment(this.data.item.sentDate, 'DD/MM/YYYY hh:mm:ss a');
      // Format to ISO string
      this.data.item.sentDate = momentInDate.format('YYYY-MM-DD[T]HH:mm')
      // this.kindOfRoom = this.data.item.kindOfRoom
      this.isEdit = true
      this.item = this.data.item
    }
    else{
      this.item.sentDate = new Date()
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
      title: 'Edit Letter Sucess',
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
  save(){
    const employees = {
      id:this.item.id,
      name: this.item.name,
      email: this.item.email,
      description: this.item.description,
      sentDate: this.item.sentDate,
    };
    if (this.isEdit) {
      debugger
      this.letterService.updateLetters(employees)
        .subscribe((res: any) => {
          // handle response
          debugger
          this.processResponse()
          this.dialogRef.close(res)
        });
    }
  }
  cancel(){
    this.dialogRef.close()
  }
}
