import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

// tslint:disable-next-line: no-unused-variable

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = {
    email: '',
    password: '',
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  showSpinner() {
    this.spinner.show();
  }
  login(): void {
    const formData = { ...this.loginForm };
    this.spinner.show();
    this.authService.loginUser(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.authService.updateLoginCredential(res.email, res.token, res.role);
        this.spinner.hide();
        this.toast.success('<p>Login Successfull</p>', '', {
          enableHtml: true,
        });
      },
      error: (error) => {
        console.log(error);
        this.authService.logOut();
        this.spinner.hide();
        this.toast.error('<p>Incorrect Credentials/Server Error</p>', '', {
          enableHtml: true,
        });
      },
    });
  }
}
