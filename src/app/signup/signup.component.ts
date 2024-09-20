// File level imports
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControlOptions
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // import component dependencies
  template: `
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="flex w-full max-w-4xl bg-[#fafafa] rounded-lg shadow-lg overflow-hidden">
        <div class="w-1/2 p-8">
          <h2 class="text-2xl font-bold mb-6">Sign Up</h2>
          <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
            <div class="mb-4">
              <label for="firstName" class="block text-m font-medium text-gray-700">First Name</label>
              <input type="text" id="firstName" formControlName="firstName" class="mt-1 block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-blue-700 focus:ring-opacity-90">
              <!-- check for first name input -->
              @if (signupForm.get('firstName')?.invalid && signupForm.get('firstName')?.touched || signupForm.get('firstName')?.dirty) {
                @if (signupForm.get('firstName')?.errors?.["required"]) {
                  <p class="mt-1 text-sm text-red-600">First name is required</p>
                }
                @if (signupForm.get('firstName')?.errors?.["minlength"]) {
                  <p class="mt-1 text-sm text-red-600">First name must not be less than 3 characters</p>
                }
                
              }
            </div>
            <div class="mb-4">
              <label for="lastName" class="block text-m font-medium text-gray-700">Last Name</label>
              <input type="text" id="lastName" formControlName="lastName" class="mt-1 block w-full rounded-md  py-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <!-- check for last name input -->
              @if (signupForm.get('lastName')?.invalid && signupForm.get('lastName')?.touched || signupForm.get('lastName')?.dirty) {
                <p class="mt-1 text-sm text-red-600">Last name is required</p>
              }
            </div>
            <div class="mb-4">
              <label for="email" class="block text-m font-medium text-gray-700">Email</label>
              <input type="email" id="email" formControlName="email" class="mt-1 block w-full rounded-md  py-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <!-- check for email input -->
              @if (signupForm.get('email')?.invalid && signupForm.get('email')?.touched || signupForm.get('email')?.dirty) {
                <p class="mt-1 text-sm text-red-600">Valid email is required</p>
              }
            </div>
            <div class="mb-4">
              <label for="password" class="block text-m font-medium text-gray-700">Password</label>
              <input type="password" id="password" formControlName="password" class="mt-1 block w-full rounded-md  py-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <!-- check for password input -->
              @if (signupForm.get('password')?.invalid && signupForm.get('password')?.touched || signupForm.get('password')?.dirty) {
                <p class="mt-1 text-sm text-red-600">Password is required</p>
              }
            </div>
            <div class="mb-6">
              <label for="confirmPassword" class="block text-m font-medium text-gray-700">Confirm Password</label>
              <input type="password" id="confirmPassword" formControlName="confirmPassword" class="mt-1 block  py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <!-- check for confirm password input -->
              @if (signupForm.get('confirmPassword')?.invalid && signupForm.get('confirmPassword')?.touched || signupForm.get('confirmPassword')?.dirty) {
                <!-- check for password match -->
                <p class="mt-1 text-sm text-red-600">Passwords must match</p>
              }
            </div>
            <button class="m-4 p-0.5 rounded-md from-indigo-400 via-pink-500 to-purple-500 bg-gradient-to-r">
      <span class="block text-black px-[100px] py-2 font-semibold rounded-md bg-white hover:bg-transparent hover:text-white transition">Sign Up</span>
      </button>
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
      firstName: ['', { validators: [Validators.required, Validators.minLength(3)]}],
      lastName: ['', { validators: [Validators.required]}],
      email: ['', { vallidators: [Validators.required, Validators.email]}],
      password: ['', { validators: [Validators.required, Validators.minLength(8)]}],
      confirmPassword: ['', { validators: [Validators.required, Validators.minLength(8)]}],
    }, { validators: this.passwordMatchValidator } as AbstractControlOptions);
  }

  // check password match 
  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  // form submission
  onSubmit() {
    if (this.signupForm.valid) {
      const user: User = {
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
      };
      console.log('User signed up:', user);
      this.router.navigate(['/login']); // route user to login page
    }
  }
}