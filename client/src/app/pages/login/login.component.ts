import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { setLocalStorageItem } from 'src/shared/local-storage.util';

// tslint:disable-next-line: no-unused-variable

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  loginForm = {
    email: '',
    password: '',
  };
  login(): void {
    const formData = { ...this.loginForm };

    this.authService.loginUser(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.authService.updateLoginCredential(res.email, res.token, res.role);
        this.toast.success('<p>Login Successfull</p>', '', {
          enableHtml: true,
        });
      },
      error: (error) => {
        console.log(error);
        this.authService.logOut();
        this.toast.error('<p>Incorrect Credentials/Server Error</p>', '', {
          enableHtml: true,
        });
      },
    });
  }
}
