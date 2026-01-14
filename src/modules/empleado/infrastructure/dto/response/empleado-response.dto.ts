export class EmpleadoResponseDto {
  id: string;
  nombre: string;
  usuario: string;
  activo: boolean;
  rol: string;
  codigo: string;
  fechaRegistro?: Date;
}
