import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: Auth, private router: Router) {}

  onRegister() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill all fields!';
      return;
    }
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        console.log('User registered:', userCredential.user);
        this.router.navigate(['/dashboard']);
        this.errorMessage = '';
      })
      .catch((error) => {
        console.error('Error registering:', error.message);
        this.errorMessage = error.message;
      });
  }
}
