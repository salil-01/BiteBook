import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { setLocalStorageItem } from 'src/shared/local-storage.util';

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
        this.authService.email = res.email;
        this.authService.role = res.role;
        this.authService.token = res.token;
        setLocalStorageItem('token', res.token);
        setLocalStorageItem('auth', true);
        setLocalStorageItem('email', res.email);
        setLocalStorageItem('role', res.role);
      },
      error: (error) => {
        console.log(error);
        this.authService.auth = false;
      },
    });
  }
}
