import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-restkey',
  templateUrl: './restkey.page.html',
  styleUrls: ['./restkey.page.scss'],
})
export class RestkeyPage implements OnInit {
  run: string = ''; // RUN del usuario
  email: string = ''; // Correo del usuario
  sedeError: string = ''; // Mensaje de error

  constructor(
    private alertController: AlertController, // Para mostrar alertas
    private router: Router, // Para la navegación
    private loginSrv: LoginService // Para manejar lógica de autenticación
  ) {}

  ngOnInit(): void {}

  // Muestra una alerta cuando se envía el correo electrónico
  async presentEmailSentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Correo enviado',
      message: 'Se ha enviado un correo electrónico con los pasos a seguir para recuperar su contraseña.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/home']); // Navegar al inicio
          },
        },
      ],
    });
    await alert.present();
  }

  // Muestra una alerta si el formulario es inválido
  async presentInvalidFormAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Formulario inválido',
      message: 'Por favor, completa todos los campos correctamente.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Enviar formulario
  async onSubmit(): Promise<void> {
    // Validar RUN y correo
    if (!this.validateRun(this.run) || !this.validateEmail(this.email)) {
      this.presentInvalidFormAlert();
      return;
    }

    try {
      // Intentar resetear la contraseña usando el servicio
      await this.loginSrv.resetPassword(this.email);
      this.presentEmailSentAlert(); // Mostrar alerta de éxito
    } catch (error) {
      this.sedeError = `Error en el reseteo: ${(error as Error).message}`;
      this.presentErrorAlert(this.sedeError); // Mostrar alerta de error
    }
  }

  // Validar formato de RUN
  validateRun(run: string): boolean {
    const runPattern = /^\d{7,8}-[0-9kK]$/; // Formato válido de RUN
    return runPattern.test(run);
  }

  // Validar formato de correo electrónico
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  // Mostrar alerta de error
  async presentErrorAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
