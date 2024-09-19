import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: true,
  template: `
    <div class="min-h-screen bg-gray-100 p-8">
      <h1 class="text-3xl font-bold mb-4">Welcome to the Main Page</h1>
      <p class="text-xl">You have successfully logged in!</p>
    </div>
  `,
})
export class MainComponent {}