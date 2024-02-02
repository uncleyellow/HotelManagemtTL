import { Component, OnInit } from '@angular/core';
import { KindOfRoomService } from '../../../../services/kindOfRoom.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  items: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  date:any
  searchParam:any
  constructor(
    public kindOfRoomServices: KindOfRoomService
  ) { }

  ngOnInit(): void {
    this.fetch()
  }
  fetch(){
    this.kindOfRoomServices.getKindOfRoom().subscribe((rs:any) =>{
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
}
