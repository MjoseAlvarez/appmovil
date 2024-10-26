import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private auth = getAuth();  // Inicializa la autenticación de Firebase
  private userStatus = new BehaviorSubject<boolean>(false);  // Mantiene el estado del usuario (logeado/no logeado)

  constructor() {
    this.checkUserStatus();  // Verifica el estado de autenticación al inicializar el servicio
  }

  // Método para registrar un nuevo usuario
  async registro(email: string, password: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      this.userStatus.next(true);  // Actualiza el estado del usuario a "logeado"
      console.log('Usuario registrado:', userCredential.user);
    } catch (error: any) {
      // Manejo de errores comunes en el registro
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('El correo electrónico ya está en uso.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Correo electrónico inválido.');
      } else {
        throw new Error('Error al registrar el usuario: ' + error.message);
      }
    }
  }

  // Método para iniciar sesión con correo electrónico y contraseña
  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.userStatus.next(true);  // Actualiza el estado del usuario a "logeado"
      console.log('Usuario logueado:', userCredential.user);
    } catch (error: any) {
      // Manejo de errores comunes en la autenticación
      if (error.code === 'auth/wrong-password') {
        throw new Error('Contraseña incorrecta.');
      } else if (error.code === 'auth/user-not-found') {
        throw new Error('Usuario no encontrado. Regístrese primero.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Correo electrónico inválido.');
      } else {
        throw new Error('Error al iniciar sesión: ' + error.message);
      }
    }
  }

  // Método para obtener el usuario actual autenticado
  getCurrentUser() {
    return this.auth.currentUser;
  }

  // Método para cerrar sesión
  async cerrarSesion(): Promise<void> {
    try {
      await signOut(this.auth);
      this.userStatus.next(false);  // Actualiza el estado del usuario a "no logeado"
      console.log('Sesión cerrada');
    } catch (error: any) {
      throw new Error('Error al cerrar sesión: ' + error.message);
    }
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.userStatus.getValue();
  }

  // Observador para monitorear el estado de autenticación del usuario
  private checkUserStatus() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userStatus.next(true);  // Si el usuario está autenticado, actualiza el estado a "logeado"
      } else {
        this.userStatus.next(false);  // Si no, actualiza el estado a "no logeado"
      }
    });
  }
}
