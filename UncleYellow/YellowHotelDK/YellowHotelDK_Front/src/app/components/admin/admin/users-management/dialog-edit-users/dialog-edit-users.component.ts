import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UsersService } from '../../../../../services/users.service';

@Component({
  selector: 'app-dialog-edit-users',
  templateUrl: './dialog-edit-users.component.html',
  styleUrls: ['./dialog-edit-users.component.css']
})
export class DialogEditUsersComponent implements OnInit {
  name: any
  email: any
  isEdit: any = false
  item: any = {};
  showPassword = false;
  constructor(
    public dialogRef: MatDialogRef<DialogEditUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public usersService: UsersService
  ) {
    debugger
    if (this.data.item) {
      this.isEdit = true
      this.item = this.data.item
    }
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
    if(!this.showPassword){
      this.showPassword = false
    }
  }
  processResponse() {
    if (this.isEdit) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: 'Edit User Sucess',
        icon: 'success',
      });
    }
    if (!this.isEdit) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: 'Add User Sucess',
        icon: 'success',
      });
    }
  }
  ngOnInit(): void {
  }
  save() {
    debugger
    const user = {
      id: this.item.id,
      userName: this.item.userName,
      passWord: this.item.passWord,
      role: this.item.role,
      creatDate: new Date()
    }
    if (this.isEdit) {
      this.usersService.updateUser(user)
        .subscribe(
          data => {
            this.processResponse()
            this.dialogRef.close(data)
          },
          err => {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              title: 'Action Fail',
              icon: 'error',
            });
            return
          }
        )
    }
    else {
      this.usersService.createUser(user)
        .subscribe((rs: any) => {
          this.processResponse()
          this.dialogRef.close(rs)
        }
        )
    }
  }

  cancel() {
    debugger
    this.dialogRef.close()
  }
}
