import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa AngularFirestore

@Component({
  selector: 'app-modificarviaje',
  templateUrl: './modificaviaje.page.html',
  styleUrls: ['./modificaviaje.page.scss'],
})
export class ModificarViajePage implements OnInit {
  viaje: any = {
    destino: '',
    capacidad: null,
    costoPorPersona: null,
  };
  viajeId: string = ''; // Inicializar como cadena vacía

  constructor(
    private navController: NavController,
    private alertController: AlertController,
    private firestore: AngularFirestore // Inyecta AngularFirestore
  ) {}

  ngOnInit() {
    this.firestore.collection('viajes', ref => ref.orderBy('timestamp', 'desc').limit(1))
      .snapshotChanges()
      .subscribe(async viajes => {
        if (viajes.length > 0) {
          const viajeData = viajes[0].payload.doc.data();
          this.viaje = viajeData;
          this.viajeId = viajes[0].payload.doc.id; // Guardar el ID del viaje
        } else {
          const alert = await this.alertController.create({
            header: 'No hay viajes',
            message: 'No se encontraron viajes creados.',
            buttons: ['OK']
          });
          await alert.present();
          //volver a menudriver
          this.navController.navigateBack('/menudriver');
        }
      });
  }

  async modificarViaje() {
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
      await this.firestore.collection('viajes').doc(this.viajeId).update(this.viaje);

      const alert = await this.alertController.create({
        message: 'El viaje ha sido modificado con éxito.',
        buttons: ['OK']
      });

      await alert.present();

      alert.onDidDismiss().then(() => {
        this.navController.navigateBack('/menudriver');
      });
    } catch (error) {
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
