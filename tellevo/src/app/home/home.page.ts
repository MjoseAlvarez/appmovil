import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  isDarkMode: boolean = false;

  constructor(private renderer: Renderer2) {}

  // Método para cambiar el tema de la aplicación
  onThemeChange(event: CustomEvent) {
    this.isDarkMode = event.detail.checked;
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }
}
