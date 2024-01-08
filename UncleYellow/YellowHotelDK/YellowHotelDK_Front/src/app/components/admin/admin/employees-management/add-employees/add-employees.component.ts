import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { EmployeesService } from 'src/app/services/employees.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent implements OnInit {
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
    public dialogRef: MatDialogRef<AddEmployeesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public employeesService: EmployeesService,
  ) {
    if (data.item) {
      debugger
      // Parse date string
      const momentInDate = moment(this.data.item.workingDayStart, 'DD/MM/YYYY hh:mm:ss a');
      // Format to ISO string
      this.data.item.workingDayStart = momentInDate.format('YYYY-MM-DD[T]HH:mm')
      // this.kindOfRoom = this.data.item.kindOfRoom
      this.isEdit = true
      this.item = this.data.item
    }
    else{
      this.item.workingDayStart = new Date()
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
      title: 'Add Employee Sucess',
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
      phoneNumber: this.item.phoneNumber,
      address: this.item.address,
      workingDayStart: this.item.workingDayStart,
      role: this.item.role,
    };
    if (this.isEdit) {
      debugger
      this.employeesService.updateEmployee(employees)
        .subscribe((res: any) => {
          // handle response
          debugger
          this.processResponse()
          this.dialogRef.close(res)
        });
    }
    else {
      debugger
      this.employeesService.addEmployees(employees).subscribe((rs: any) => {
        this.processResponse()
        return this.dialogRef.close()
      });
    }
  }
  cancel(){
    this.dialogRef.close()
  }
}
