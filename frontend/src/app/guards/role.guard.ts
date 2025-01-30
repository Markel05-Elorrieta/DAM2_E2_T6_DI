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

    // Mapeo de tipo_id a rutas permitidas
    const roleRoutes: Record<number, string> = {
      1: 'god-admin', // god
      2: 'god-admin', // admin (se asume que admin y god van juntos)
      3: 'teachers',  // teacher
      4: 'students',  // student
    };

    // Si el usuario está logueado y trata de ir a /login, redirigirlo a su home correspondiente
    if (state.url === '/login') {
      const userHome = `/${roleRoutes[userRole]}/home`;
      this.router.navigate([userHome]);
      return false;
    }

    // Si el usuario intenta acceder a una ruta que no le corresponde, redirigir a su home
    if (roleRoutes[userRole] !== requiredRole) {
      const userHome = `/${roleRoutes[userRole]}/home`;
      this.router.navigate([userHome]);
      return false;
    }

    return true;
  }
}