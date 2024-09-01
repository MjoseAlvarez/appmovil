import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unirseviaje',
  templateUrl: './unirseviaje.page.html',
  styleUrls: ['./unirseviaje.page.scss'],
})
export class UnirseviajePage implements OnInit {
  viajesDisponibles: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
    } else {
      this.cargarViajes(); // Carga los viajes disponibles si el usuario está autenticado
    }
  }

  cargarViajes() {
    const viajes = localStorage.getItem('viajes');
    this.viajesDisponibles = viajes ? JSON.parse(viajes) : [];
  }

  unirseAlViaje(viaje: any) {
    if (typeof viaje.capacidad === 'number' && viaje.capacidad > 0) {
      viaje.capacidad--;
      console.log('Te has unido al viaje:', viaje.destino);
      localStorage.setItem('viajes', JSON.stringify(this.viajesDisponibles));
    } else {
      console.error('No hay espacio disponible en este viaje.');
    }
  }
}
