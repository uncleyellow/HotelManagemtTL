import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LetterService } from 'src/app/services/letter.service';
import Swal from 'sweetalert2';
import { DialogDeleteRecordAnyComponent } from '../dialog-delete-record-any/dialog-delete-record-any.component';
import { EditLetterComponent } from './edit-letter/edit-letter.component';

@Component({
  selector: 'letter-contact',
  templateUrl: './letterContact.component.html',
  styleUrls: ['./letterContact.component.css'],
})
export class LetterContactComponent implements OnInit {
  items: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  date:any
  searchParam:any
  constructor(
    public letterService: LetterService,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.fetch()
  }
  fetch(){
    this.letterService.getLetters().subscribe((rs:any) =>{
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
    const dialogRef = this.dialog.open(EditLetterComponent, {
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
        deleteLetters:true,
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

  search(keyword?: any){
    if(!keyword){
      this.fetch()
    }
    else{
      this.letterService.searchLetters(keyword)
      .subscribe(users => {
        debugger
        this.items = users;
      });
    }
  }
}
