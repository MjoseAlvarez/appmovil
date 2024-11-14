import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa AngularFirestore

@Component({
  selector: 'app-solicitudesviaje',
  templateUrl: './solicitudesviaje.page.html',
  styleUrls: ['./solicitudesviaje.page.scss'],
})
export class SolicitudesviajePage implements OnInit {
  solicitudes: any[] = [];

  constructor(
    private alertController: AlertController,
    private firestore: AngularFirestore // Inyecta AngularFirestore
  ) {}

  ngOnInit() {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.firestore.collection('viajes').snapshotChanges().subscribe(viajesSnapshot => {
      this.solicitudes = [];
      viajesSnapshot.forEach(viaje => {
        const data = viaje.payload.doc.data() as any; // Asegurarse de que data es de tipo any
        const id = viaje.payload.doc.id;
        if (data.solicitudes && data.solicitudes.length > 0) {
          data.solicitudes.forEach((solicitud: any) => {
            if (typeof solicitud === 'string') {
              this.solicitudes.push({ id, email: solicitud, estado: 'pendiente' });
            } else {
              this.solicitudes.push({ id, ...solicitud });
            }
          });
        }
      });
    });
  }

  async aceptarSolicitud(solicitud: any) {
    try {
      const viajeRef = this.firestore.collection('viajes').doc(solicitud.id);
      const viajeDoc = await viajeRef.get().toPromise();
      const viajeData = viajeDoc?.data() as any;

      if (viajeData) {
        const index = viajeData.solicitudes.findIndex((s: any) => s.email === solicitud.email);
        if (index > -1) {
          viajeData.solicitudes[index].estado = 'aceptada';
          await viajeRef.update({ solicitudes: viajeData.solicitudes });

          const alert = await this.alertController.create({
            header: 'Solicitud aceptada',
            message: `Has aceptado la solicitud de ${solicitud.email}.`,
            buttons: ['OK']
          });

          await alert.present();
        }
      }
    } catch (error) {
      console.error('Error al aceptar la solicitud: ', error);
    }
  }

  async rechazarSolicitud(solicitud: any) {
    try {
      const viajeRef = this.firestore.collection('viajes').doc(solicitud.id);
      const viajeDoc = await viajeRef.get().toPromise();
      const viajeData = viajeDoc?.data() as any;

      if (viajeData) {
        const index = viajeData.solicitudes.findIndex((s: any) => s.email === solicitud.email);
        if (index > -1) {
          viajeData.solicitudes[index].estado = 'rechazada';
          await viajeRef.update({ solicitudes: viajeData.solicitudes });

          const alert = await this.alertController.create({
            header: 'Solicitud rechazada',
            message: `Has rechazado la solicitud de ${solicitud.email}.`,
            buttons: ['OK']
          });

          await alert.present();
        }
      }
    } catch (error) {
      console.error('Error al rechazar la solicitud: ', error);
    }
  }
}
