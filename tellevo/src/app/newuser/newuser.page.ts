import { Component, OnInit, inject } from '@angular/core';
import { SedesService } from '../sedes.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';  // Asegúrate de tener LoadingController importado
import { Router } from '@angular/router';
import { lastValueFrom, timer } from 'rxjs'; // Necesario para simular la carga de red

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
  isDiurno: boolean = true;

  // Definir todas las propiedades de error
  telefonoError: string = '';
  sedeError: string = '';
  confirmPasswordError: string = '';
  passwordError: string = '';
  emailError: string = ''; 
  nombreError: string = ''; 
  runError: string = ''; 

  sedesSrv = inject(SedesService);
  selectedSede: any;

  constructor(
    private navController: NavController,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController // Inyectamos LoadingController
  ) {}

  async ngOnInit() {
    // Crear el loader y mostrarlo
    const loader = await this.loadingController.create({
      message: 'Cargando datos...', // Mensaje del loader
      duration: 2000 // 2 segundos, puedes ajustarlo
    });

    await loader.present();

    // Simular tiempo de espera
    await lastValueFrom(timer(1500)); // Simulación de espera de 1.5 segundos

    // Cargar datos o realizar acciones necesarias
    // this.sedesSrv.cargarSedes(); // Por ejemplo, puedes usar este método para cargar sedes

    // Descartar el loader
    await loader.dismiss();
  }

  toggleChanged() {
    this.isDiurno = !this.isDiurno;
    console.log('Modo cambiado a', this.isDiurno ? 'Diurno' : 'Vespertino');
  }

  async registro() {
    // Validaciones de los campos de entrada
    if (!this.nombre || this.nombre.trim().length === 0) {
      this.nombreError = 'Por favor, ingrese un nombre válido.';
      return;
    } else {
      this.nombreError = '';
    }

    const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
    if (!rutRegex.test(this.run)) {
      this.runError = 'Por favor, ingrese un RUT válido en formato XXXXXXXX-X.';
      return;
    } else {
      this.runError = '';
    }

    const telefonoRegex = /^\+569\d{8}$/;
    if (!telefonoRegex.test(this.telefono)) {
      this.telefonoError = 'Número de teléfono no válido.';
      return;
    } else {
      this.telefonoError = '';
    }

    if (!this.email.includes('@')) {
      this.emailError = 'Por favor, ingrese un correo electrónico válido.';
      return;
    } else {
      this.emailError = '';
    }

    if (this.password.length < 6) {
      this.passwordError = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    } else {
      this.passwordError = '';
    }

    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'Las contraseñas no coinciden.';
      return;
    } else {
      this.confirmPasswordError = '';
    }

    if (!this.selectedSede) {
      this.sedeError = 'Por favor, seleccione una sede.';
      return;
    } else {
      this.sedeError = '';
    }

    // Mostrar el loader antes de registrar el usuario
    const loader = await this.loadingController.create({
      message: 'Registrando usuario...', // Mensaje del loader
      duration: 2000, // 2 segundos, puedes ajustarlo
    });

    await loader.present();

    // Simular tiempo de espera
    await lastValueFrom(timer(1500)); // Simulación de espera de 1.5 segundos

    // Guardar el usuario en localStorage
    localStorage.setItem('user', JSON.stringify({
      nombre: this.nombre,
      run: this.run,
      telefono: this.telefono,
      email: this.email,
      password: this.password,
      sede: this.selectedSede,
      modalidad: this.isDiurno ? 'Diurno' : 'Vespertino'
    }));

    // Cerrar el loader una vez que se guarda el usuario
    await loader.dismiss();

    // Mostrar el Alert de éxito
    const alert = await this.alertController.create({
      header: 'Registro Exitoso',
      message: 'Usuario registrado con éxito.',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navController.navigateForward('menu');
        }
      }]
    });

    await alert.present();
  }
}
