import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-moddatos',
  templateUrl: './moddatos.page.html',
  styleUrls: ['./moddatos.page.scss'],
})
export class ModdatosPage implements OnInit {
  telefono: string = ''; 

  constructor(private navController: NavController, private alertController: AlertController) { }

  ngOnInit() {
    
    const usuario = JSON.parse(localStorage.getItem('user') || '{}');
    this.telefono = usuario.telefono || ''; // Obtener el teléfono si existe
  }

  
  async modificarTelefono() {
    if (this.telefono.length < 9) {
      console.error('El teléfono debe tener al menos 9 caracteres.');
      return;
    }

    
    const usuario = JSON.parse(localStorage.getItem('user') || '{}');
    usuario.telefono = this.telefono;
    localStorage.setItem('user', JSON.stringify(usuario));


    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Teléfono modificado con éxito.',
      buttons: ['OK']
    });

    await alert.present();

    console.log('Teléfono modificado con éxito:', this.telefono);
    this.navController.navigateBack('/userlog'); 
  }

  
  cerrarSesion() {
    localStorage.removeItem('user');  // Eliminar los datos  usuario del localStorage
    this.navController.navigateRoot('/login');  
  }
}
