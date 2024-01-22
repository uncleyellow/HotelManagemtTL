import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EmployeesService } from 'src/app/services/employees.service';
import { DialogDeleteRecordAnyComponent } from '../dialog-delete-record-any/dialog-delete-record-any.component';
import { AddEmployeesComponent } from './add-employees/add-employees.component';

@Component({
  selector: 'app-employees-management',
  templateUrl: './employees-management.component.html',
  styleUrls: ['./employees-management.component.css'],
})
export class EmployeesManagementComponent implements OnInit {
  items: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  date:any
  searchParam:any
  constructor(
    public employeesService: EmployeesService,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.fetch()
  }
  fetch(){
    this.employeesService.getEmployees().subscribe((rs:any) =>{
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
    const dialogRef = this.dialog.open(AddEmployeesComponent, {
      panelClass: 'bg-color', // Add your custom panel class
      data: {
        title: "Edit Employees",
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
        deleteEmployees:true,
        title: "Delete Employees",
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
    const dialogRef = this.dialog.open(AddEmployeesComponent, {
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
      this.employeesService.searchEmployees(keyword)
      .subscribe(users => {
        debugger
        this.items = users;
      });
    }
    else{
      this.employeesService.searchEmployees(keyword)
      .subscribe(users => {
        debugger
        this.items = users;
      });
    }
  }
}
