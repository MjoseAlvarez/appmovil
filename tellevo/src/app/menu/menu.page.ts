import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  
  nav = inject(NavController);


  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const user = await this.loginService.getCurrentUser();
    console.log('Usuario autenticado en MenuPage:', user);
    if (!user) {
      this.router.navigate(['/login']);
    }
  }

  // Método para redirigir a la página "home"
  async goToConductor() {
    this.router.navigate(['/menudriver']);
  }

  // Método para redirigir a la página "otraRuta" o cualquier otra
  async goToPasajero() {
    this.router.navigate(['/unirseviaje']);
  }
}
