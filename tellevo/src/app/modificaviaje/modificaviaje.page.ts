import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa AngularFirestore

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
  // ID del viaje, inicializado como cadena vacía
  viajeId: string = '';

  constructor(
    private navController: NavController, // Controlador de navegación
    private alertController: AlertController, // Controlador de alertas
    private firestore: AngularFirestore // Inyecta AngularFirestore
  ) {}

  ngOnInit() {
    // Consulta a Firestore para obtener el último viaje ordenado por fechaCreacion
    this.firestore.collection('viajes', ref => ref.orderBy('fechaCreacion', 'desc').limit(1))
      .snapshotChanges()
      .subscribe(async viajes => {
        if (viajes.length > 0) {
          // Si hay viajes, obtener los datos del primer documento
          const viajeData = viajes[0].payload.doc.data();
          this.viaje = viajeData;
          this.viajeId = viajes[0].payload.doc.id; // Guardar el ID del viaje
        } else {
          // Si no hay viajes, mostrar una alerta
          const alert = await this.alertController.create({
            header: 'No hay viajes',
            message: 'No se encontraron viajes creados.',
            buttons: ['OK']
          });
          await alert.present();
          // Volver al menú del conductor
          this.navController.navigateBack('/menudriver');
        }
      });
  }

  async modificarViaje() {
    // Validar que los datos del viaje sean válidos
    if (!this.viaje.destino || this.viaje.capacidad <= 0 || this.viaje.costoPorPersona <= 0) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingrese datos válidos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    try {
      // Intentar actualizar el viaje en Firestore
      await this.firestore.collection('viajes').doc(this.viajeId).update(this.viaje);

      // Mostrar una alerta de éxito
      const alert = await this.alertController.create({
        message: 'El viaje ha sido modificado con éxito.',
        buttons: ['OK']
      });

      await alert.present();

      // Navegar de vuelta al menú del conductor después de cerrar la alerta
      alert.onDidDismiss().then(() => {
        this.navController.navigateBack('/menudriver');
      });
    } catch (error) {
      // Manejar errores y mostrar una alerta de error
      console.error('Error al modificar el viaje: ', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al modificar el viaje. Por favor, inténtalo de nuevo.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}