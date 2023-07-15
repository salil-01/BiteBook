import { Component } from '@angular/core';

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
  login() {
    const formData = { ...this.loginForm };
    console.log(formData);
  }
}
