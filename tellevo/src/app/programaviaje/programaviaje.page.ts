import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';  // Importa AlertController y NavController

@Component({
  selector: 'app-programaviaje',
  templateUrl: './programaviaje.page.html',
  styleUrls: ['./programaviaje.page.scss'],
})
export class ProgramaviajePage implements OnInit {
  destino: string = '';
  capacidad: number = 0;
  costoPorPersona: number = 0;

  constructor(
    private router: Router, 
    private alertController: AlertController,  // Inyecta AlertController
    private navController: NavController       // Inyecta NavController para la navegación
  ) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
    }
  }

  async programarViaje() {
    // Verificación de campos obligatorios
    if (!this.destino || this.capacidad <= 0 || this.costoPorPersona <= 0) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios y deben tener valores válidos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Crear el objeto viaje con los datos ingresados
    const viaje = {
      destino: this.destino,
      capacidad: this.capacidad,
      costoPorPersona: this.costoPorPersona
    };

    // Recuperar viajes guardados en localStorage, o inicializar un arreglo vacío si no existen
    let viajes = JSON.parse(localStorage.getItem('viajes') || '[]');
    viajes.push(viaje); // Añadir el nuevo viaje al arreglo
    localStorage.setItem('viajes', JSON.stringify(viajes)); // Guardar los viajes en localStorage

    // Mostrar mensaje de éxito
    const alert = await this.alertController.create({
      message: 'El viaje ha sido programado con éxito.',
      buttons: ['OK']
    });

    await alert.present();

    // Redirigir al menú del conductor después de que el usuario cierre la alerta
    alert.onDidDismiss().then(() => {
      this.navController.navigateBack('/menudriver');
    });
  }
}
