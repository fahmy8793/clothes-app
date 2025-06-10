import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: Auth, private router: Router) {}

  onLogin(event: Event) {
    event.preventDefault(); // منع إعادة التحميل
    if (!this.email || !this.password) {
      alert('Please fill all fields!');
      return;
    }
    setPersistence(this.auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(this.auth, this.email, this.password);
      })
      .then((userCredential) => {
        console.log('User logged in:', userCredential.user);
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.error('Error logging in:', error.code, error.message);
        if (error.code === 'auth/network-request-failed') {
          alert('Network error. Check your internet or try again later.');
        } else if (error.code === 'auth/invalid-credential') {
          alert('Invalid email or password.');
        } else {
          alert(error.message);
        }
      });
  }
}
