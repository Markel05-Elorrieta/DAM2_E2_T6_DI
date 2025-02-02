import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = localStorage.getItem('user');

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    const userData = JSON.parse(user);
    const userRole = userData.tipo_id;
    const requiredRole = route.data['role'];

    const roleRoutes: Record<number, string> = {
      1: 'god-admin', // god
      2: 'god-admin', // admin
      3: 'teachers',  // teacher
      4: 'students',  // student
    };

    const userHome = `/${roleRoutes[userRole]}/home`;

    if (state.url === '/login') {
      if (roleRoutes[userRole]) {
        this.router.navigate([userHome]);
        return false;
      }
      return true;
    }

    if (roleRoutes[userRole] !== requiredRole) {
      this.router.navigate([userHome]);
      return false;
    }

    return true;
  }
}