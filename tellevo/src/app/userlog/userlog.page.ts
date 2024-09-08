// Importa los módulos necesarios de Angular y Ionic
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

// Define el componente con su selector, plantilla y estilos
@Component({
  selector: 'app-userlog', // Selector del componente
  templateUrl: './userlog.page.html', // Ruta de la plantilla HTML
  styleUrls: ['./userlog.page.scss'], // Ruta de los estilos CSS
})
export class UserlogPage implements OnInit {

  // Constructor que inyecta los servicios AlertController y Router
  constructor(private alertController: AlertController, private router: Router) { }

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
  }

  // Método asíncrono para presentar una alerta de cierre de sesión
  async presentLogoutAlert() {
    // Crea la alerta con el título, mensaje y botones
    const alert = await this.alertController.create({
      header: 'Cerrar sesión', // Título de la alerta
      message: '¿Estás seguro de que deseas cerrar sesión?', // Mensaje de la alerta
      buttons: [
        {
          text: 'Cancelar', // Texto del botón de cancelar
          role: 'cancel', // Rol del botón de cancelar
          cssClass: 'secondary', // Clase CSS del botón de cancelar
          handler: () => {
            console.log('Confirm Cancel'); // Acción al cancelar
          }
        }, {
          text: 'Cerrar sesión', // Texto del botón de cerrar sesión
          handler: () => {
            console.log('Confirm Logout'); // Acción al confirmar cierre de sesión
            // Aquí puedes añadir la lógica para cerrar sesión
            this.router.navigate(['/home']); // Navega a la página de inicio
          }
        }
      ]
    });

    // Presenta la alerta
    await alert.present();
  }
}
