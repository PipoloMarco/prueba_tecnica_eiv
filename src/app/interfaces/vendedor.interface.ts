export interface Vendedor {
  id: number;
  usuarioLogin: string;
  nombre: string;
  habilitado: boolean;
  fechaNacimiento: Date;
  observaciones: null | string;
  localidad: Localidad;
}

export interface Localidad {
  id: number;
  localidad: string;
  codigoPostal: string;
}
