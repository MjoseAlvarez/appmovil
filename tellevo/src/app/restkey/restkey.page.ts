import { Component, inject, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-restkey',
  templateUrl: './restkey.page.html',
  styleUrls: ['./restkey.page.scss'],
})
export class RestkeyPage implements OnInit {
  run: string = '';
  email: string = '';
  sedeError: string = '';

  constructor(
    private alertController: AlertController, // Inyecta AlertController para mostrar alertas
    private router: Router, // Inyecta Router para la navegación
    private loginSrv: LoginService // Inyecta LoginService para el envío de correos electrónicos
  ) {}

  ngOnInit() {}

  // Método para mostrar una alerta cuando se envía el correo electrónico
  async presentEmailSentAlert() {
    const alert = await this.alertController.create({
      header: 'Correo enviado',
      message: 'Se ha enviado un correo electrónico con los pasos a seguir para recuperar su contraseña.',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/home']); // Navega a la página de inicio
        }
      }]
    });

    await alert.present();
  }

  // Método para mostrar una alerta cuando el formulario es inválido
  async presentInvalidFormAlert() {
    const alert = await this.alertController.create({
      header: 'Formulario inválido',
      message: 'Por favor, completa todos los campos correctamente.',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Método que se ejecuta al enviar el formulario
  async onSubmit() {
      try {
        await this.loginSrv.resetPassword(this.email);
        // Redirigir al menú después del registro exitoso
        this.router.navigate(['/menu']);  // Asegúrate de que la ruta 'menu' esté bien configurada
      } catch (error) {
        this.sedeError = 'Error en el reseteo: ' + (error as Error).message;
      }
    

    if (this.run && this.email && this.validateRun(this.run) && this.validateEmail(this.email)) {
      // Aquí puedes añadir la lógica para enviar el correo electrónico
      this.presentEmailSentAlert();
    } else {
      this.presentInvalidFormAlert();
    }
  }

  // Método para validar el RUN
  validateRun(run: string): boolean {
    const runPattern = /^\d{7,8}-[0-9kK]$/;
    return runPattern.test(run);
  }

  // Método para validar el correo electrónico
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  
}
