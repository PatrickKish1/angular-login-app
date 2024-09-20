import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen from-indigo-400 via-pink-500 to-purple-500 bg-gradient-to-r">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}