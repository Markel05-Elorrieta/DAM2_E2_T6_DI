import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeIkasleComponent } from './ikasleak/home-ikasle/home-ikasle.component';

export const routes: Routes = [
    {
        title: 'Login',
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'ikasleak',
        title: 'Home - Ikasleak',
        redirectTo: 'ikasleak/home',
    },
    {
        path: 'irakasleak',
        title: 'Home - Irakasleak',
        redirectTo: 'irakasleak/home',
    },
    {
        path: 'ikasleak',
        title: 'Ikasleak',
        children: [
            {
                title: 'Home - Ikasleak',
                path: 'home',
                component: HomeIkasleComponent
            },
        ]
    },


];
