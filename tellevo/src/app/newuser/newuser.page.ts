import { Component, OnInit, inject } from '@angular/core';
import { SedesService } from '../sedes.service';
import { NavController, AlertController } from '@ionic/angular'; // Importa AlertController
import { Router } from '@angular/router';  

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.page.html',
  styleUrls: ['./newuser.page.scss'],
})
export class NewuserPage implements OnInit {

  nombre: string = '';
  run: string = '';
  email: string = '';
  telefono: string = '';  
  password: string = '';
  confirmPassword: string = '';

  sedesSrv = inject(SedesService);
  selectedSede: any;

  constructor(
    private navController: NavController, 
    private router: Router, 
    private alertController: AlertController // Inyecta AlertController
  ) { }

  ngOnInit() {}

  async registro() {
    if (!this.nombre || this.nombre.trim().length === 0) {
      console.error('Por favor, ingrese un nombre válido.');
      return;
    }

    const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
    if (!rutRegex.test(this.run)) {
      console.error('Por favor, ingrese un RUT válido en formato XXXXXXXX-X.');
      return;
    }

    const telefonoRegex = /^\+569\d{8}$/; 
    if (!telefonoRegex.test(this.telefono)) {
      console.error('Número de teléfono no válido.');
      return;
    }

    if (!this.email.includes('@')) {
      console.error('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    if (this.password.length < 6) {
      console.error('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      console.error('Las contraseñas no coinciden.');
      return;
    }

    if (!this.selectedSede) {
      console.error('Por favor, seleccione una sede.');
      return;
    }

    // Guardar el usuario en localStorage
    localStorage.setItem('user', JSON.stringify({
      nombre: this.nombre,
      run: this.run,
      telefono: this.telefono,  // Guardar el teléfono
      email: this.email,
      password: this.password,
      sede: this.selectedSede
    }));

    // Mostrar el Alert de éxito
    const alert = await this.alertController.create({
      header: 'Registro Exitoso',
      message: 'Usuario registrado con éxito.',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navController.navigateForward('menu');  // Redirigir al menú
        }
      }]
    });

    await alert.present();
  }
}
