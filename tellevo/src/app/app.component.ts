import { Component } from '@angular/core';
import * as firebase from 'firebase/app'; // Importa Firebase
import 'firebase/auth'; // Importa el módulo de autenticación
import 'firebase/firestore'; // Importa el módulo de Firestore

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.initializeFirebase();  // Llamada al método de inicialización de Firebase
  }

  // Método para inicializar Firebase
  private initializeFirebase(): void {
    const firebaseConfig = {
      apiKey: "AIzaSyAG0-mZSO93DJmV8PgYF9-Gt5sKlG0Rkjs",
      authDomain: "appmovil-f83ba.firebaseapp.com",
      projectId: "appmovil-f83ba",
      storageBucket: "appmovil-f83ba.appspot.com",
      messagingSenderId: "945121709256",
      appId: "1:945121709256:web:0e1857a2aba93e6bfb69fd"
    };

    // Inicializa Firebase directamente sin la verificación de apps
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase inicializado con éxito.");
  }
}
