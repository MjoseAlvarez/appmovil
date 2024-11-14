import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Usa compat
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa AngularFireAuth

@Component({
  selector: 'app-programaviaje',
  templateUrl: './programaviaje.page.html',
  styleUrls: ['./programaviaje.page.scss'],
})
export class ProgramaviajePage implements OnInit {
  destino: string = '';
  capacidad: number = 0;
  costoPorPersona: number = 0;
  userEmail: string = ''; // Inicializar como cadena vacía

  constructor(
    private router: Router,
    private alertController: AlertController,
    private navController: NavController,
    private firestore: AngularFirestore, // Inyecta AngularFirestore
    private afAuth: AngularFireAuth // Inyecta AngularFireAuth
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user && user.email) {
        this.userEmail = user.email; // Asigna el correo del usuario autenticado
      } else {
        this.router.navigate(['/login']); // Redirige al login si no está autenticado
      }
    });
  }

  async programarViaje() {
    if (!this.destino || this.capacidad <= 0 || this.costoPorPersona <= 0) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios y deben tener valores válidos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
  
    const viaje = {
      destino: this.destino,
      capacidad: this.capacidad,
      costoPorPersona: this.costoPorPersona,
      timestamp: new Date(), // Añadir marca de tiempo
      creador: this.userEmail // Añadir el correo del creador del viaje
    };
  
    try {
      await this.firestore.collection('viajes').add(viaje);
  
      const alert = await this.alertController.create({
        message: 'El viaje ha sido programado con éxito.',
        buttons: ['OK']
      });
  
      await alert.present();
  
      alert.onDidDismiss().then(() => {
        this.navController.navigateBack('/menudriver');
      });
    } catch (error) {
      console.error('Error al programar el viaje: ', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al programar el viaje. Por favor, inténtalo de nuevo.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
