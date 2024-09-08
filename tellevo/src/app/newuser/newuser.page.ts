import { Component, OnInit, inject } from '@angular/core';
import { SedesService } from '../sedes.service';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.page.html',
  styleUrls: ['./newuser.page.scss'],
})
export class NewuserPage implements OnInit {

  // Variables para almacenar los datos del formulario
  nombre: string = '';
  run: string = '';
  email: string = '';
  telefono: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Variables para almacenar los mensajes de error
  nombreError: string = '';
  runError: string = '';
  emailError: string = '';
  telefonoError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';
  sedeError: string = '';

  // Inyección del servicio de sedes
  sedesSrv = inject(SedesService);
  selectedSede: any;

  // Inyección de dependencias NavController, Router y AlertController
  constructor(
    private navController: NavController,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  // Método para registrar un nuevo usuario
  async registro() {
    this.resetErrors(); // Resetea los mensajes de error

    // Validación del nombre
    if (!this.nombre || this.nombre.trim().split(' ').length < 2) {
      this.nombreError = 'Por favor, ingrese un nombre y apellido.';
      return;
    }

    // Validación del RUN
    const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
    if (!rutRegex.test(this.run)) {
      this.runError = 'Por favor, ingrese un RUT válido en formato XXXXXXXX-X.';
      return;
    }

    // Validación del teléfono
    const telefonoRegex = /^\+569\d{8}$/;
    if (!telefonoRegex.test(this.telefono)) {
      this.telefonoError = 'Número de teléfono no válido.';
      return;
    }

    // Validación del correo electrónico
    if (!this.email.includes('@')) {
      this.emailError = 'Por favor, ingrese un correo electrónico válido.';
      return;
    }

    // Validación de la contraseña
    if (this.password.length < 6) {
      this.passwordError = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    // Validación de la confirmación de la contraseña
    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'Las contraseñas no coinciden.';
      return;
    }

    // Validación de la sede seleccionada
    if (!this.selectedSede) {
      this.sedeError = 'Por favor, seleccione una sede.';
      return;
    }

    // Guardar los datos del usuario en localStorage
    localStorage.setItem('user', JSON.stringify({
      nombre: this.nombre,
      run: this.run,
      telefono: this.telefono,
      email: this.email,
      password: this.password,
      sede: this.selectedSede
    }));

    // Mostrar alerta de éxito
    const alert = await this.alertController.create({
      header: 'Registro Exitoso',
      message: 'Usuario registrado con éxito.',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navController.navigateForward('menu'); // Navegar al menú
        }
      }]
    });

    await alert.present();
  }

  // Método para resetear los mensajes de error
  resetErrors() {
    this.nombreError = '';
    this.runError = '';
    this.emailError = '';
    this.telefonoError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';
    this.sedeError = '';
  }
}
