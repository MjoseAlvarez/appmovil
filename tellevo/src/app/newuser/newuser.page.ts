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

    // Guardar el usuario en localStorage (simulación de almacenamiento)
    localStorage.setItem('user', JSON.stringify({
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
