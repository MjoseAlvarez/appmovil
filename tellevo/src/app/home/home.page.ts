import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  isDarkMode: boolean = false; // Estado inicial del tema

  constructor() {
    // Opcional: Cargar el estado del tema desde almacenamiento local
    this.isDarkMode = JSON.parse(localStorage.getItem('isDarkMode') || 'false');
    this.applyTheme();
  }

  onThemeChange(event: any) {
    this.isDarkMode = event.detail.checked;
    this.applyTheme();
  }

  private applyTheme() {
    document.body.classList.toggle('dark-theme', this.isDarkMode);
    document.body.classList.toggle('light-theme', !this.isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
  }
}
