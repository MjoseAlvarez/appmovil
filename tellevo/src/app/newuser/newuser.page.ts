import { Component, Inject, inject, OnInit } from '@angular/core';
import { SedesService } from '../sedes.service';

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

  constructor() { }

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
    // Aquí puedes redirigir al usuario a otra página
  }
}
