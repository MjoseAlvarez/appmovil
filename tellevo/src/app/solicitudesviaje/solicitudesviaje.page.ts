import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-solicitudesviaje',
  templateUrl: './solicitudesviaje.page.html',
  styleUrls: ['./solicitudesviaje.page.scss'],
})
export class SolicitudesviajePage implements OnInit {

  solicitudes = [
    { nombre: 'Juan Pérez', email: 'juanperez@mail.com', avatar: '../../assets/icon/avatar.png' },
    { nombre: 'María González', email: 'mariagonzalez@mail.com', avatar: '../../assets/icon/avatar.png' },
    // Puedes agregar más solicitudes...
  ];

  constructor(private alertController: AlertController) { }

  ngOnInit() {}

  async aceptarSolicitud(solicitud: any) {
    const alert = await this.alertController.create({
      header: 'Solicitud aceptada',
      message: `Has aceptado la solicitud de ${solicitud.nombre}.`,
      buttons: ['OK']
    });

    await alert.present();
  }

  async rechazarSolicitud(solicitud: any) {
    const alert = await this.alertController.create({
      header: 'Solicitud rechazada',
      message: `Has rechazado la solicitud de ${solicitud.nombre}.`,
      buttons: ['OK']
    });

    await alert.present();
  }
}
