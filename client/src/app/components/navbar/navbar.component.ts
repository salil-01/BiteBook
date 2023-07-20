import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  showProfileMenu: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }
  handleLogin(): void {
    this.router.navigate([`/login`]);
  }

  logout() {
    this.authService.logOut();
    // Perform any additional logout logic here (e.g., navigate to the home page)
  }
}
