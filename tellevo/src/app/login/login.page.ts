import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { LoginService } from '../login.service';  // Asegúrate de tener el servicio en la ruta correcta


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  toastSrv = inject(ToastController);
  loginSrv = inject(LoginService);
  nav = inject(NavController);

  emailError: string = '';
  passwordError: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit(): void {}

  async login() {
    this.resetErrors();

    // Validaciones de email y contraseña
    if (!this.email.includes('@')) {
      this.emailError = 'Por favor, ingrese un correo electrónico válido.';
      return;
    }

    if (this.password.length < 6) {
      this.passwordError = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    try {
      // Llama al servicio de autenticación para iniciar sesión
      await this.loginSrv.login(this.email, this.password);
      console.log('Inicio de sesión exitoso');
      this.router.navigate(['menu']);  // Redirigir a la página de menú
    } catch (error: any) {
      console.error('Error al iniciar sesión', error);
      let errorMsg = 'Error al iniciar sesión. Inténtelo de nuevo.';
      
      // Mensajes personalizados de error
      if (error.message.includes('auth/user-not-found')) {
        errorMsg = 'Usuario no encontrado.';
      } else if (error.message.includes('auth/wrong-password')) {
        errorMsg = 'Contraseña incorrecta.';
      }

      this.passwordError = errorMsg;
      await this.showAlert('Error', errorMsg);
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

  goToResetPassword() {
    this.nav.navigateForward('/restkey');
  }
}
