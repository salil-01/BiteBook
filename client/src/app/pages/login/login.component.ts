import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

// tslint:disable-next-line: no-unused-variable

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  loginForm = {
    email: '',
    password: '',
  };
  login(): void {
    const formData = { ...this.loginForm };

    this.authService.loginUser(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.authService.auth = true;
      },
      error: (error) => {
        console.log(error);
        this.authService.auth = false;
      },
    });
  }
}
