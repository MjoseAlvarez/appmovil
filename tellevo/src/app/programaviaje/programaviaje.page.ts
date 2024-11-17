import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Usa compat
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa AngularFireAuth
import { Viaje } from '../_models/viaje';

@Component({
  selector: 'app-programaviaje',
  templateUrl: './programaviaje.page.html',
  styleUrls: ['./programaviaje.page.scss'],
})
export class ProgramaviajePage implements OnInit {

  viaje: Viaje = {} as Viaje;
  userName: string | null = null; // Variable para almacenar el nombre del usuario

  constructor(
    private router: Router,
    private alertController: AlertController,
    private navController: NavController,
    private firestore: AngularFirestore, // Inyecta AngularFirestore
    private afAuth: AngularFireAuth // Inyecta AngularFireAuth
  ) {}

  ngOnInit() {
    // Obtiene el estado del usuario autenticado
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.viaje.userEmail = user.email || 'Sin email'; // Asigna el email
        this.userName = user.displayName || 'Usuario'; // Asigna el nombre del usuario
      } else {
        this.router.navigate(['/login']); // Redirige al login si no está autenticado
      }
    });
  }

  async programarViaje() {
    if (!this.viaje.destino || this.viaje.capacidad <= 0 || this.viaje.costoPorPersona <= 0) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios y deben tener valores válidos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
  
    const viaje = {
      destino: this.viaje.destino,
      capacidad: this.viaje.capacidad,
      costoPorPersona: this.viaje.costoPorPersona,
      fechaCreacion: new Date(), // Marca de tiempo
      creador: this.viaje.userEmail // Correo del creador
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
