import { Component, OnInit, inject } from '@angular/core';
import { SedesService } from '../sedes.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';  // Importa Router para navegación angular

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.page.html',
  styleUrls: ['./newuser.page.scss'],
})
export class NewuserPage implements OnInit {

  nombre: string = '';
  run: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  sedesSrv = inject(SedesService);
  selectedSede: any;

  // Inyecta NavController y Router en el constructor
  constructor(private navController: NavController, private router: Router) { }

  ngOnInit() {}

  // Método para registrar el usuario
  registro() {
    // Validación del nombre
    if (!this.nombre || this.nombre.trim().length === 0) {
      console.error('Por favor, ingrese un nombre válido.');
      return;
    }

    // Validación del RUT (formato básico: XXXXXXXX-X)
    const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
    if (!rutRegex.test(this.run)) {
      console.error('Por favor, ingrese un RUT válido en formato XXXXXXXX-X.');
      return;
    }

    // Validación del email
    if (!this.email.includes('@')) {
      console.error('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    // Validación de la contraseña (mínimo 6 caracteres)
    if (this.password.length < 6) {
      console.error('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Validación de la coincidencia de contraseñas
    if (this.password !== this.confirmPassword) {
      console.error('Las contraseñas no coinciden.');
      return;
    }

    // Validación de la selección de sede
    if (!this.selectedSede) {
      console.error('Por favor, seleccione una sede.');
      return;
    }

    // Guardar el usuario en localStorage (simulación de almacenamiento)
    localStorage.setItem('user', JSON.stringify({
      nombre: this.nombre,
      run: this.run,
      email: this.email,
      password: this.password,
      sede: this.selectedSede
    }));

    console.log('Usuario registrado con éxito:', this.email);

    // Redirigir al usuario usando NavController o Router
    this.navController.navigateForward('home');  // Navegación con NavController de Ionic
    // O también puedes usar el router de Angular si lo prefieres:
    // this.router.navigate(['home']);
  }
}
