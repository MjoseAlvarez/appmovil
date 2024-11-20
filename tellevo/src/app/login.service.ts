import { Injectable } from '@angular/core';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  sendPasswordResetEmail 
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private auth = getAuth(); // Inicializa la instancia de autenticación de Firebase

  constructor() {}

  /**
   * Método para registrar un nuevo usuario
   */
  async registro(name: string, rut: string, email: string, password: string, confirmPassword: string): Promise<any> {
    if (!name.trim()) {
      throw new Error('El nombre no puede estar en blanco.');
    }
    if (!/^\d{7,8}-[kK\d]$/.test(rut)) {
      throw new Error('El RUT es inválido.');
    }
    if (password !== confirmPassword) {
      throw new Error('Las contraseñas no coinciden.');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Método para iniciar sesión con correo electrónico y contraseña
   */
  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Usuario logueado:', userCredential.user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Método para obtener el usuario actual autenticado
   */
  async getCurrentUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  }

  /**
   * Método para cerrar sesión
   */
  async cerrarSesion(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('Sesión cerrada.');
    } catch (error: any) {
      throw new Error('Error al cerrar sesión: ' + error.message);
    }
  }

  /**
   * Método para enviar un correo de restablecimiento de contraseña
   */
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log('Correo de reinicio de contraseña enviado.');
    } catch (error: any) {
      throw new Error('No se pudo enviar el correo de reinicio de contraseña: ' + error.message);
    }
  }
}
