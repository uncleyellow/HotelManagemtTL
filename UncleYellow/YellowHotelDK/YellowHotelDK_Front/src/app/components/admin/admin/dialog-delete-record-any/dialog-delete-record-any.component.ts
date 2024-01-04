import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    public usersService: UsersService
  ) {

  }

  ngOnInit(): void {

  }
  save() {
    this.usersService.deleteUser(this.data.item.id)
      .subscribe((res: any) => {
        // handle response
        this.processResponse()
        this.dialogRef.close()
      });
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
