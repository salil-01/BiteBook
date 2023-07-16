import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private router: Router) {}
  email: string = '';
  password: string = '';
  role: string = 'user';
  submitForm() {
    if (!this.email || !this.password || !this.role) {
      alert('Please fill in all fields');
      return;
    }

    console.log('Form submitted!');
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Role:', this.role);
  }
}
