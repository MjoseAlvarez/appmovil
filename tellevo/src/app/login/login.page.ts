import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  emailError: string = '';
  passwordError: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  async login() {
    this.resetErrors();

    if (!this.email.includes('@')) {
      this.emailError = 'Por favor, ingrese un correo electrónico válido.';
      return;
    }

    if (this.password.length < 6) {
      this.passwordError = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    const usuarioRegistrado = JSON.parse(localStorage.getItem('user') || '{}');
    if (usuarioRegistrado.email === this.email && usuarioRegistrado.password === this.password) {
      console.log('Inicio de sesión exitoso');
      this.router.navigate(['menu']);
    } else {
      this.passwordError = 'Credenciales incorrectas. Inténtelo de nuevo.';
      await this.showAlert('Error', 'Credenciales incorrectas. Inténtelo de nuevo.');
    }
  }

  resetErrors() {
    this.emailError = '';
    this.passwordError = '';
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
