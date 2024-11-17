export interface NewUser {
    nombre: string;
    run: string;
    email: string;
    password: string;
    password2: string;
    sedeError?: string;
  }
  
  export interface Usuario {
    nombre: string;
    run: string;
    userEmail: string;
    userId: string;
  }
  
  export interface Viaje {
    destino: string;
    capacidad: number;
    costoPorPersona: number;
    userEmail: string;
    fechaCreacion: Date;
  }
  