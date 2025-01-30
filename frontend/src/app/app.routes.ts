import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeIkasleComponent } from './ikasleak/home-ikasle/home-ikasle.component';
import { HomeIrakasleComponent } from './irakasleak/home-irakasle/home-irakasle.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BilerakComponent } from './bilerakComponents/bilerak/bilerak.component';
import { GodAdminComponent } from './god-admin/home-god-admin/god-admin.component';
import { EditatuGehituComponent } from './god-admin/editatu-gehitu/editatu-gehitu.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    title: 'Login - JEM SchoolsApp',
    component: LoginComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'students',
    title: 'Students',
    canActivate: [RoleGuard],
    data: { role: 'ikaslea' },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', title: 'Home - Students - JEM SchoolsApp', component: HomeIkasleComponent },
      { path: 'meeting/:id', title: 'Meeting - Students - JEM SchoolsApp', component: BilerakComponent },
    ],
  },
  {
    path: 'teachers',
    title: 'Teachers',
    canActivate: [RoleGuard],
    data: { role: 'irakaslea' },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', title: 'Home - Teachers - JEM SchoolsApp', component: HomeIrakasleComponent },
      { path: 'meeting/:id', title: 'Meeting - Teachers - JEM SchoolsApp', component: BilerakComponent },
    ],
  },
  {
    path: 'god-admin',
    title: 'God / Admin',
    canActivate: [RoleGuard],
    data: { role: 'god-admin' },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', title: 'Home - God/Admin - JEM SchoolsApp', component: GodAdminComponent },
      { path: 'meeting/:id', title: 'Meeting - God/Admin - JEM SchoolsApp', component: BilerakComponent },
      { path: 'add', title: 'Add User - God/Admin - JEM SchoolsApp', component: EditatuGehituComponent },
      { path: 'edit/:id', title: 'Edit User - God/Admin - JEM SchoolsApp', component: EditatuGehituComponent },
    ],
  },
  {
    path: '**',
    title: '404 Not Found - JEM SchoolsApp',
    component: NotFoundComponent,
  },
];
