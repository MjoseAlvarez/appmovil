import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.page.html',
  styleUrls: ['./newuser.page.scss'],
})
export class NewuserPage implements OnInit {

  sedesRm = [
    { id: 1, nombre: 'Alameda' },
    { id: 2, nombre: 'Padre Alonso de Ovalle' },
    { id: 3, nombre: 'Antonio Varas' },
    { id: 4, nombre: 'Educación Continua' },
    { id: 5, nombre: 'Maipú' },
    { id: 6, nombre: 'Melipilla' },
    { id: 7, nombre: 'Plaza Norte' },
    { id: 8, nombre: 'Plaza Oeste' },
    { id: 8, nombre: 'Plaza Vespucio' },
    { id: 8, nombre: 'Puente Alto' },
    { id: 8, nombre: 'San Bernardo' },
    { id: 8, nombre: 'San Carlos de Apoquindo' },
    { id: 8, nombre: 'San Joaquín' },
  ];
  
  selectedSede: any;

  constructor() { }

  
  ngOnInit() {
  }

}
