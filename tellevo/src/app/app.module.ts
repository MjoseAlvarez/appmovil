import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// Firebase y AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Rutas y componente raíz
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Configuración del entorno (Firebase)
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent // Componente raíz de la aplicación
  ],
  imports: [
    // Módulos básicos
    BrowserModule, // Habilita el uso de Angular en navegadores
    IonicModule.forRoot(), // Inicialización de Ionic
    AppRoutingModule, // Configuración de rutas

    // Módulos de Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializar Firebase
    AngularFirestoreModule, // Soporte para Firestore

    // Módulos para formularios
    FormsModule, // Manejo de formularios con ngModel
    ReactiveFormsModule // Manejo de formularios reactivos
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy } // Estrategia de reutilización de rutas
  ],
  bootstrap: [AppComponent] // Punto de inicio de la aplicación
})
export class AppModule {
  constructor() {
    // Validar configuración de Firebase (opcional)
    if (!environment.firebaseConfig || !environment.firebaseConfig.apiKey) {
      console.error('Advertencia: Configuración de Firebase no definida o incompleta');
    }
  }
}
