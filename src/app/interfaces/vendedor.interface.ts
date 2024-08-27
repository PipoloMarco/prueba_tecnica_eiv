import { Localidad } from './localidad.interface';

export interface Vendedor {
  id?: number;
  usuarioLogin: string;
  nombre: string;
  habilitado: boolean;
  fechaNacimiento: Date | string;
  observaciones: null | string;
  localidad?: Localidad;
  localidadId?: number;
}
