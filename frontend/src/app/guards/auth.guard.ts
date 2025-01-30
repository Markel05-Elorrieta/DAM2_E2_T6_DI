import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('user');

    if (user) {
      const userData = JSON.parse(user);
      const userRole = userData.tipo_id; 

      // Si el usuario intenta ir a /login, lo redirigimos a su panel
      if (this.router.url.includes('/login')) {
        this.redirectToDashboard(userRole);
        return false;
      }

      return true;
    }

    // Si no está autenticado, lo enviamos a login
    this.router.navigate(['/login']);
    return false;
  }

  private redirectToDashboard(tipo_id: number) {
    switch (tipo_id) {
      case 1: // jainkoa (god)
        this.router.navigate(['/god-admin/home']);
        break;
      case 2: // administratzailea (administrador)
        this.router.navigate(['/god-admin/home']);
        break;
      case 3: // irakaslea (profesor)
        this.router.navigate(['/teachers/home']);
        break;
      case 4: // ikaslea (alumno)
        this.router.navigate(['/students/home']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }
}
