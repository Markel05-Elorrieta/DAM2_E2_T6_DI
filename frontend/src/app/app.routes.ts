import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeIkasleComponent } from './ikasleak/home-ikasle/home-ikasle.component';
import { HomeIrakasleComponent } from './irakasleak/home-irakasle/home-irakasle.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BilerakComponent } from './bilerakComponents/bilerak/bilerak.component';
import { GodAdminComponent } from './god-admin/home-god-admin/god-admin.component';
import { EditatuGehituComponent } from './god-admin/editatu-gehitu/editatu-gehitu.component';

export const routes: Routes = [
  {
    title: 'Login - JEM SchoolsApp',
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'students',
    title: 'Students',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        title: 'Home - Students - JEM SchoolsApp',
        path: 'home',
        component: HomeIkasleComponent,
      },
      {
        title: 'Meeting - Students - JEM SchoolsApp',
        path: 'meeting/:id',
        component: BilerakComponent,
      }
    ],
  },
  {
    path: 'teachers',
    title: 'Teachers',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        title: 'Home - Teachers - JEM SchoolsApp',
        path: 'home',
        component: HomeIrakasleComponent,
      },
      {
        title: 'Meeting - Teachers - JEM SchoolsApp',
        path: 'meeting/:id',
        component: BilerakComponent,
      }
    ],
  },
  {
    path: 'god-admin',
    title: 'God / Admin',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        title: 'Home - God/Admin - JEM SchoolsApp',
        path: 'home',
        component: GodAdminComponent,
      },
      {
        title: 'Meeting - God/Admin - JEM SchoolsApp',
        path: 'meeting/:id',
        component: BilerakComponent,
      },
      {
        title: 'Add User - God/Admin - JEM SchoolsApp',
        path: 'add',
        component: EditatuGehituComponent,
      },
      {
        title: 'Edit User - God/Admin - JEM SchoolsApp',
        path: 'edit/:id',
        component: EditatuGehituComponent,
      }
    ],
  },
  {
    path: '**',
    title: '404 Not Found - JEM SchoolsApp',
    component: NotFoundComponent,
  },
];
