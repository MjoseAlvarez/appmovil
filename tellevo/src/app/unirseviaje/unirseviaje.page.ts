import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa AngularFirestore
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa AngularFireAuth
import { AlertController, NavController } from '@ionic/angular'; // Importa AlertController y NavController

@Component({
  selector: 'app-unirseviaje',
  templateUrl: './unirseviaje.page.html',
  styleUrls: ['./unirseviaje.page.scss'],
})
export class UnirseviajePage implements OnInit {
  viajesDisponibles: any[] = [];
  userEmail: string = ''; // Inicializar como cadena vacía

  constructor(
    private router: Router,
    private firestore: AngularFirestore, // Inyecta AngularFirestore
    private afAuth: AngularFireAuth, // Inyecta AngularFireAuth
    private alertController: AlertController, // Inyecta AlertController
    private navController: NavController // Inyecta NavController
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user && user.email) {
        this.userEmail = user.email; // Asigna el correo del usuario autenticado
        this.cargarViajes();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  cargarViajes() {
    this.firestore.collection('viajes').snapshotChanges().subscribe(viajesSnapshot => {
      this.viajesDisponibles = viajesSnapshot.map(viaje => {
        const data = viaje.payload.doc.data() as any; // Asegurarse de que data es de tipo any
        const id = viaje.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  async unirseAlViaje(viaje: any) {
    // Verificar si el usuario ya tiene una solicitud en curso
    const solicitudEnCurso = this.viajesDisponibles.some(v =>
      v.solicitudes && v.solicitudes.some((s: any) => s.email === this.userEmail && s.estado === 'pendiente')
    );
    if (solicitudEnCurso) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ya tienes una solicitud en curso.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (typeof viaje.capacidad === 'number' && viaje.capacidad > 0) {
      viaje.capacidad--;

      try {
        // Añadir la solicitud con estado de pendiente
        const nuevaSolicitud = { email: this.userEmail, estado: 'pendiente' };
        const solicitudes = viaje.solicitudes ? [...viaje.solicitudes, nuevaSolicitud] : [nuevaSolicitud];
        await this.firestore.collection('viajes').doc(viaje.id).update({ capacidad: viaje.capacidad, solicitudes });

        const alert = await this.alertController.create({
          message: 'Solicitud enviada con éxito.',
          buttons: ['OK']
        });

        await alert.present();

        alert.onDidDismiss().then(() => {
          this.navController.navigateBack('/menu'); // Redirige a la página del menú
        });

        console.log('Te has unido al viaje:', viaje.destino);
      } catch (error) {
        console.error('Error al unirse al viaje: ', error);
      }
    } else {
      console.error('No hay espacio disponible en este viaje.');
    }
  }
}
