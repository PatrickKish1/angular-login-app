import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="w-1/2 p-8">
          <h2 class="text-2xl font-bold mb-6">Sign Up</h2>
          <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
            <div class="mb-4">
              <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" id="firstName" formControlName="firstName" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              @if (signupForm.get('firstName')?.invalid && signupForm.get('firstName')?.touched) {
                <p class="mt-1 text-sm text-red-600">First name is required</p>
              }
            </div>
            <div class="mb-4">
              <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" id="lastName" formControlName="lastName" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              @if (signupForm.get('lastName')?.invalid && signupForm.get('lastName')?.touched) {
                <p class="mt-1 text-sm text-red-600">Last name is required</p>
              }
            </div>
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" formControlName="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              @if (signupForm.get('email')?.invalid && signupForm.get('email')?.touched) {
                <p class="mt-1 text-sm text-red-600">Valid email is required</p>
              }
            </div>
            <div class="mb-4">
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="password" formControlName="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              @if (signupForm.get('password')?.invalid && signupForm.get('password')?.touched) {
                <p class="mt-1 text-sm text-red-600">Password is required</p>
              }
            </div>
            <div class="mb-6">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input type="password" id="confirmPassword" formControlName="confirmPassword" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              @if (signupForm.get('confirmPassword')?.invalid && signupForm.get('confirmPassword')?.touched) {
                <p class="mt-1 text-sm text-red-600">Passwords must match</p>
              }
            </div>
            <button type="submit" class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sign Up</button>
          </form>
          <p class="mt-4 text-center text-sm text-gray-600">
            Already have an account? <a routerLink="/login" class="font-medium text-indigo-600 hover:text-indigo-500">Log in</a>
          </p>
        </div>
        <div class="w-1/2">
          <img src="/assets/signup.png" alt="Signup" class="object-cover w-full h-full">
        </div>
      </div>
    </div>
  `,
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const user: User = {
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
      };
      console.log('User signed up:', user);
      this.router.navigate(['/main']);
    }
  }
}