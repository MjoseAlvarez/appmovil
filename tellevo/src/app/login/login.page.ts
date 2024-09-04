import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {} // Inyecta Router

  // Método para manejar el inicio de sesión
  login() {
    if (!this.email.includes('@')) {
      console.error('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    if (this.password.length < 6) {
      console.error('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Verificar credenciales
    const usuarioRegistrado = JSON.parse(localStorage.getItem('user') || '{}');
    if (usuarioRegistrado.email === this.email && usuarioRegistrado.password === this.password) {
      console.log('Inicio de sesión exitoso');
      this.router.navigate(['menu']); // Usa Router para la navegación
    } else {
      console.error('Credenciales incorrectas. Inténtelo de nuevo.');
      this.router.navigate(['menu']); // Usa Router para la navegación
    }
  }
}
