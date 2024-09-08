import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';  

@Component({
  selector: 'app-modificarviaje',
  templateUrl: './modificaviaje.page.html',
  styleUrls: ['./modificaviaje.page.scss'],
})
export class ModificarViajePage implements OnInit {
  // Objeto para almacenar los datos del viaje
  viaje: any = {
    destino: '',
    capacidad: null,
    costoPorPersona: null,
  };

  // Inyección de dependencias NavController y AlertController
  constructor(private navController: NavController, private alertController: AlertController) { }

  ngOnInit() {
    // Cargar el viaje almacenado en localStorage cuando se inicie la página
    const viajeGuardado = JSON.parse(localStorage.getItem('viaje') || '{}');
    this.viaje = viajeGuardado;
  }

  async modificarViaje() {
    // Validaciones
    if (!this.viaje.destino || this.viaje.capacidad <= 0 || this.viaje.costoPorPersona <= 0) {
      // Mostrar alerta de error si los datos no son válidos
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingrese datos válidos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Guarda los cambios en localStorage
    localStorage.setItem('viaje', JSON.stringify(this.viaje));

    // Mostrar alerta de éxito
    const alert = await this.alertController.create({
      message: 'El viaje ha sido modificado con éxito.',
      buttons: ['OK']
    });

    await alert.present();

    // Regresar a la página de inicio después de cerrar la alerta
    alert.onDidDismiss().then(() => {
      this.navController.navigateBack('/menudriver');
    });
  }
}
