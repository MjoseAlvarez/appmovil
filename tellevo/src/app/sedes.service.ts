import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SedesService {

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
  
  modalidad: string='Diurno';

  constructor() { }

  setModalidad(modalidad: string) {
    this.modalidad = modalidad;
    console.log('Modalidad cambiada a', this.modalidad);
  }
}
