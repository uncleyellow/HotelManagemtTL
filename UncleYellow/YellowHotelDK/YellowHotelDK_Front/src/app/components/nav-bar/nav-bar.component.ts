import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLoggedIn = false;
  user_name ="";
  constructor(private router:Router,private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn == this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout();
    debugger
    this.isLoggedIn == false
    this.router.navigate(['/home'])
  }
}

