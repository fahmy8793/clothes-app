import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Added for *ngIf support

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // Added CommonModule
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Added for error handling

  constructor(private auth: Auth, private router: Router) {}

  onLogin() { // Removed Event parameter since we're not using form submission
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill all fields!';
      return;
    }

    setPersistence(this.auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(this.auth, this.email, this.password);
      })
      .then((userCredential) => {
        console.log('User logged in:', userCredential.user);
        this.router.navigate(['/dashboard']);
        this.errorMessage = ''; // Clear any previous errors
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        this.handleLoginError(error);
      });
  }

  private handleLoginError(error: any): void {
    switch (error.code) {
      case 'auth/network-request-failed':
        this.errorMessage = 'Network error. Please check your connection.';
        break;
      case 'auth/invalid-credential':
        this.errorMessage = 'Invalid email or password.';
        break;
      case 'auth/too-many-requests':
        this.errorMessage = 'Too many attempts. Try again later.';
        break;
      default:
        this.errorMessage = 'Login failed. Please try again.';
    }
  }
}