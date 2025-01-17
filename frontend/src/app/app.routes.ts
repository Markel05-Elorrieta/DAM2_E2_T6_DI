import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeIkasleComponent } from './ikasleak/home-ikasle/home-ikasle.component';
import { HomeIrakasleComponent } from './irakasleak/home-irakasle/home-irakasle.component';

export const routes: Routes = [
    {
        title: 'Login - JEM SchoolsApp',
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'ikasleak',
        title: 'Home - Ikasleak - JEM SchoolsApp',
        redirectTo: 'ikasleak/home',
    },
    {
        path: 'irakasleak',
        title: 'Home - Irakasleak - JEM SchoolsApp',
        redirectTo: 'irakasleak/home',
    },
    {
        path: 'ikasleak',
        title: 'Ikasleak',
        children: [
            {
                title: 'Home - Ikasleak - JEM SchoolsApp', 
                path: 'home',
                component: HomeIkasleComponent
            },
        ]
    },
    {
        path: 'irakasleak',
        title: 'Irakasleak',
        children: [
            {
                title: 'Home - Irakasleak - JEM SchoolsApp',
                path: 'home',
                component: HomeIrakasleComponent
            },
        ]
    },


];
