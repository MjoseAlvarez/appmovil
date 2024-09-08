// Importa los módulos necesarios de Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Define el componente con su selector, plantilla y estilos
@Component({
  selector: 'app-unirseviaje', // Selector del componente
  templateUrl: './unirseviaje.page.html', // Ruta de la plantilla HTML
  styleUrls: ['./unirseviaje.page.scss'], // Ruta de los estilos CSS
})
export class UnirseviajePage implements OnInit {
  // Define una propiedad para almacenar los viajes disponibles
  viajesDisponibles: any[] = [];

  // Constructor que inyecta el servicio Router
  constructor(private router: Router) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    // Obtiene el usuario del localStorage
    const user = localStorage.getItem('user');
    // Si no hay usuario, redirige al login
    if (!user) {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
    } else {
      this.cargarViajes(); // Carga los viajes disponibles si el usuario está autenticado
    }
  }

  // Método para cargar los viajes disponibles desde el localStorage
  cargarViajes() {
    // Obtiene los viajes del localStorage
    const viajes = localStorage.getItem('viajes');
    // Si hay viajes, los parsea y los asigna a la propiedad viajesDisponibles, si no, asigna un array vacío
    this.viajesDisponibles = viajes ? JSON.parse(viajes) : [];
  }

  // Método para unirse a un viaje
  unirseAlViaje(viaje: any) {
    // Verifica si la capacidad del viaje es un número y es mayor que 0
    if (typeof viaje.capacidad === 'number' && viaje.capacidad > 0) {
      viaje.capacidad--; // Disminuye la capacidad del viaje
      console.log('Te has unido al viaje:', viaje.destino); // Muestra un mensaje en la consola
      // Actualiza los viajes en el localStorage
      localStorage.setItem('viajes', JSON.stringify(this.viajesDisponibles));
    } else {
      console.error('No hay espacio disponible en este viaje.'); // Muestra un error en la consola si no hay espacio
    }
  }
}
