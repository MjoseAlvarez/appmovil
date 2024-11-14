import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa AngularFireAuth
import { LoginService } from '../login.service';

@Component({
  selector: 'app-userlog',
  templateUrl: './userlog.page.html',
  styleUrls: ['./userlog.page.scss'],
})
export class UserlogPage implements OnInit {
  userEmail: string = ''; // Inicializar como cadena vacía

  constructor(
    private alertController: AlertController,
    private router: Router,
    private loginService: LoginService,
    private afAuth: AngularFireAuth // Inyecta AngularFireAuth
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user && user.email) {
        this.userEmail = user.email; // Asigna el correo del usuario autenticado
      }
    });
  }

  async presentLogoutAlert() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Cerrar sesión',
          handler: async () => {
            console.log('Confirm Logout');
            try {
              await this.loginService.cerrarSesion();
              this.router.navigate(['/home']);  // Navega a la página de login después de cerrar sesión
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
