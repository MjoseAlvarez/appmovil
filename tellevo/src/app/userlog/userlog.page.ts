import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-userlog',
  templateUrl: './userlog.page.html',
  styleUrls: ['./userlog.page.scss'],
})
export class UserlogPage implements OnInit {

  constructor(private alertController: AlertController, private router: Router, private loginService: LoginService) { }

  ngOnInit() { }

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
