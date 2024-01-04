import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../../../services/users.service';
import { DialogDeleteRecordAnyComponent } from '../dialog-delete-record-any/dialog-delete-record-any.component';
import { DialogEditUsersComponent } from './dialog-edit-users/dialog-edit-users.component';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css'],
})
export class UsersManagementComponent implements OnInit {
  items: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  constructor(
    public dialog: MatDialog,
    public userService: UsersService
  ) { }

  ngOnInit(): void {
    this.fetch()
  }
  fetch(page?: any) {
    this.userService.getUsers()
      .subscribe(res => {
        this.items = res;
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
    const dialogRef = this.dialog.open(DialogEditUsersComponent, {
      panelClass: 'bg-color', // Add your custom panel class
      data: {
        title: "Edit User",
        item: item
      }
    });

    dialogRef.afterClosed().subscribe(
      (rs: any) => {
        if (rs) {
          this.fetch
        }
      }
    );
  }
  delete(item: any) {
    const dialogRef = this.dialog.open(DialogDeleteRecordAnyComponent, {
      panelClass: 'bg-color', // Add your custom panel class
      data: {
        title: "Delete Users",
        item: item
      }
    });

    dialogRef.afterClosed().subscribe(
      (rs: any) => {
        if (rs) {
          this.fetch
        }
      }
    );
  }
  addUsers() {
    const dialogRef = this.dialog.open(DialogEditUsersComponent, {
      panelClass: 'bg-color', // Add your custom panel class
      data: {
        title: "Booking Room",
      }
    });

    dialogRef.afterClosed().subscribe((rs: any) => {
      if (rs) {
        this.fetch
      }
    });
  }
}
