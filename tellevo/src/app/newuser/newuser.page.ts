import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.page.html',
  styleUrls: ['./newuser.page.scss'],
})
export class NewuserPage implements OnInit {
  
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  
  sedesRm = [
    { id: 1, nombre: 'Alameda' },
    { id: 2, nombre: 'Padre Alonso de Ovalle' },
    { id: 3, nombre: 'Antonio Varas' },
    { id: 4, nombre: 'Educación Continua' },
    { id: 5, nombre: 'Maipú' },
    { id: 6, nombre: 'Melipilla' },
    { id: 7, nombre: 'Plaza Norte' },
    { id: 8, nombre: 'Plaza Oeste' },
    { id: 9, nombre: 'Plaza Vespucio' },
    { id: 10, nombre: 'Puente Alto' },
    { id: 11, nombre: 'San Bernardo' },
    { id: 12, nombre: 'San Carlos de Apoquindo' },
    { id: 13, nombre: 'San Joaquín' },
  ];
  
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
