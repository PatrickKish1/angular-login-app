// file level import
import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

// define route configuration
export const routes: Routes = [
    { path: '',
        redirectTo: '/signup',
        pathMatch: 'full'
    },
    { path: 'signup',
        component: SignupComponent,
        title: 'Sign Up'
    },
    { path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    { path: 'main',
        component: MainComponent,
        title: 'Home'
    },
];