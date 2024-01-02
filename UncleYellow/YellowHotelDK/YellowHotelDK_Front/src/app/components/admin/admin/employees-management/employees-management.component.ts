import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees-management',
  templateUrl: './employees-management.component.html',
  styleUrls: ['./employees-management.component.css'],
})
export class EmployeesManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.fetch()
  }
  fetch(){

  }

}
