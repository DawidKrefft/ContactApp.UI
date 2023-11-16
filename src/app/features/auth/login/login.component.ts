import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  model: LoginRequest;
  validationErrors: string[] = [];

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.model = {
      email: '',
      password: '',
    };
  }

  onFormSubmit(): void {
    this.authService.login(this.model).subscribe({
      next: (response) => {
        // Set Auth Cookie
        this.cookieService.set(
          'Authorization',
          `Bearer ${response.token}`,
          undefined,
          '/',
          undefined,
          true,
          'Strict'
        );

        // Set User
        this.authService.setUser({
          email: response.email,
          roles: response.roles,
        });

        // Redirect back to Home
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        // Handle specific error cases if needed
        if (error.status === 500) {
          this.validationErrors.push(
            'Invalid email or password. Please try again.'
          );
        } else {
          console.error('Error during login:', error);
        }
      },
    });
  }
}
