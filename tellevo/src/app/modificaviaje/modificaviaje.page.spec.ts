import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-modificarviaje',
  templateUrl: './modificaviaje.page.html',
  styleUrls: ['./modificaviaje.page.scss'],
})
export class ModificarViajePage implements OnInit {
  viaje: {
    destino: string;
    capacidad: number | null;
    costoPorPersona: number | null;
  } = {
    destino: '',
    capacidad: null,
    costoPorPersona: null,
  };

  viajeId: string = ''; // ID del viaje actual para modificar

  constructor(
    private navController: NavController,
    private alertController: AlertController,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.cargarUltimoViaje();
  }

  // Método para cargar el último viaje desde Firestore
  cargarUltimoViaje() {
    this.firestore
      .collection('viajes', (ref) => ref.orderBy('timestamp', 'desc').limit(1))
      .snapshotChanges()
      .subscribe(async (viajes) => {
        if (viajes.length > 0) {
          const viajeData = viajes[0].payload.doc.data() as any;
          this.viaje = viajeData;
          this.viajeId = viajes[0].payload.doc.id;
        } else {
          const alert = await this.alertController.create({
            header: 'No hay viajes',
            message: 'No se encontraron viajes creados.',
            buttons: ['OK'],
          });
          await alert.present();
          this.navController.navigateBack('/menudriver');
        }
      });
  }

  // Método para validar y modificar el viaje
  async modificarViaje() {
    if (!this.viaje.destino || this.viaje.capacidad === null || this.viaje.capacidad <= 0 || this.viaje.costoPorPersona === null || this.viaje.costoPorPersona <= 0) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos con datos válidos.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      await this.firestore.collection('viajes').doc(this.viajeId).update(this.viaje);

      const alert = await this.alertController.create({
        message: 'El viaje ha sido modificado con éxito.',
        buttons: ['OK'],
      });

      await alert.present();
      alert.onDidDismiss().then(() => {
        this.navController.navigateBack('/menudriver');
      });
    } catch (error) {
      console.error('Error al modificar el viaje: ', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al modificar el viaje. Por favor, inténtalo nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
