import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegisterRequest } from '../models/register-request.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  model: RegisterRequest;
  validationErrors: string[] = [];

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.model = {
      email: '',
      password: '',
      // Other properties from your RegisterRequest model
    };
  }

  onFormSubmit(): void {
    this.authService.register(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        if (error.error && error.error.title) {
          this.validationErrors = [error.error.title];
        } else {
          this.validationErrors = ['An unknown error occurred.'];
        }
        console.error('Registration error:', error);
      },
    });
  }
}
