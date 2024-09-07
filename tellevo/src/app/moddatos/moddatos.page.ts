import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Asegúrate de importar NavController

@Component({
  selector: 'app-moddatos',
  templateUrl: './moddatos.page.html',
  styleUrls: ['./moddatos.page.scss'],
})
export class ModdatosPage implements OnInit {
  telefono: string = ''; // Añadimos el campo del teléfono

  constructor(private navController: NavController) { }

  ngOnInit() {
    // Cargar el teléfono almacenado en localStorage cuando se inicie la página
    const usuario = JSON.parse(localStorage.getItem('user') || '{}');
    this.telefono = usuario.telefono || ''; // Obtener el teléfono si existe
  }

  // Función para modificar el teléfono
  modificarTelefono() {
    if (this.telefono.length < 9) {
      console.error('El teléfono debe tener al menos 9 caracteres.');
      return;
    }

    // Guardar el nuevo teléfono en localStorage
    const usuario = JSON.parse(localStorage.getItem('user') || '{}');
    usuario.telefono = this.telefono;
    localStorage.setItem('user', JSON.stringify(usuario));

    console.log('Teléfono modificado con éxito:', this.telefono);
    this.navController.navigateBack('/home');  // Navegar de regreso a la página de inicio
  }

  // Función para cerrar sesión
  cerrarSesion() {
    localStorage.removeItem('user');  // Eliminar los datos del usuario del localStorage
    this.navController.navigateRoot('/login');  // Redirigir al login
  }
}
