import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-programaviaje',
  templateUrl: './programaviaje.page.html',
  styleUrls: ['./programaviaje.page.scss'],
})
export class ProgramaviajePage implements OnInit {
  destino: string = '';
  capacidad: number = 0;
  costoPorPersona: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
    }
  }

  programarViaje() {
    // Verificación de campos obligatorios
    if (!this.destino || this.capacidad <= 0 || this.costoPorPersona <= 0) {
      console.error('Todos los campos son obligatorios y deben tener valores válidos.');
      return;
    }

    // Crear el objeto viaje con los datos ingresados
    const viaje = {
      destino: this.destino,
      capacidad: this.capacidad,
      costoPorPersona: this.costoPorPersona
    };

    // Recuperar viajes guardados en localStorage, o inicializar un arreglo vacío si no existen
    let viajes = JSON.parse(localStorage.getItem('viajes') || '[]');
    viajes.push(viaje); // Añadir el nuevo viaje al arreglo
    localStorage.setItem('viajes', JSON.stringify(viajes)); // Guardar los viajes en localStorage

    console.log('Viaje programado con éxito:', viaje);
  }
}

