import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root',
})
export class LogeadoGuard implements CanActivate {

  constructor(private login: LoginService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = await this.login.getCurrentUser();
    console.log('Usuario autenticado en LogeadoGuard:', user);
    
    if (user) {
      return true;  // Permitir acceso si el usuario está autenticado
    } else {
      this.router.navigate(['/home']);
      return false;  // Redirigir al login si no está autenticado
    }
  }
}
@Injectable({
  providedIn: 'root',
})
export class VisitaGuard implements CanActivate {

  constructor(private login: LoginService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = await this.login.getCurrentUser();
    console.log('Usuario autenticado en visitaGuard:', user);

    if (!user) {
      return true;  // Permitir acceso si no hay usuario autenticado
    } else {
      this.router.navigate(['/menu']);  // Redirigir a menu si ya está logueado
      return false;
    }
  }
}
