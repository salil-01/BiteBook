import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  showProfileMenu: boolean = false;

  constructor(public authService: AuthService) {}

  // ngOnInit() {
  //   // Check if user is logged in and get user role from AuthService
  //   this.isLoggedIn = this.authService.auth;
  //   this.isAdmin = this.authService.role === 'Admin';
  // }
  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    this.authService.logOut();
    // Perform any additional logout logic here (e.g., navigate to the home page)
  }
}
