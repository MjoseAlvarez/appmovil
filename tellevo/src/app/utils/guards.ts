import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root',
})
export class logeadoGuard implements CanActivate {

  constructor(private login: LoginService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = await this.login.getCurrentUser();
    
    if (user) {
      return true;  // Permitir acceso si el usuario está autenticado
    } else {
      this.router.navigate(['/login']);
      return false;  // Redirigir al login si no está autenticado
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class visitaGuard implements CanActivate {

  constructor(private login: LoginService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = await this.login.getCurrentUser();

    if (!user) {
      return true;  // Permitir acceso si no hay usuario autenticado
    } else {
      this.router.navigate(['/home']);
      return false;  // Redirigir a home si ya está logueado
    }
  }
}
