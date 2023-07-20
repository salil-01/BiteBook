import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) {}
  email: string = '';
  password: string = '';
  role: string = 'User';
  submitForm() {
    if (this.email === '' || this.password === '') {
      this.toast.info('<p>Please Fill in all the Fields</p>', '', {
        enableHtml: true,
      });
      return;
    }
    this.spinner.show();
    const formData = {
      email: this.email,
      password: this.password,
      role: this.role,
    };
    this.authService.registerUser(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.spinner.hide();
        this.toast.success('<p>Register Successfull</p>', '', {
          enableHtml: true,
        });
        this.router.navigate([`/login`]);
      },
      error: (error) => {
        console.log(error);
        this.spinner.hide();
        this.toast.error('<p>Server Error</p>', '', {
          enableHtml: true,
        });
      },
    });
  }
}
