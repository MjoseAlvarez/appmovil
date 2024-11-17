
  
export interface Usuario{
    nombre: string;
    run: string;
    userEmail: string;
    userId: string;
}

export interface Viaje{
    destino: string;
    capacidad: number;
    costoPorPersona: number;
    userEmail: string;
    fechaCreacion: Date;

}

