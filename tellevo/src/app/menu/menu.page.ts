import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  // Método para redirigir a la página "home"
  goToHome() {
    this.router.navigate(['/home']);
  }

  // Método para redirigir a la página "otraRuta" o cualquier otra
  goToOtherPage() {
    this.router.navigate(['/otraRuta']);
  }

}
