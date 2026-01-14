import { Empleado } from '../../../domain/entities/empleado.entity';
import { EmpleadoResponseDto } from '../response/empleado-response.dto';

export class EmpleadoMapper {
  static toResponse(empleado: Empleado): EmpleadoResponseDto {
    return {
      id: empleado.id,
      nombre: empleado.nombre,
      usuario: empleado.usuario,
      activo: empleado.activo,
      rol: empleado.rol,
      codigo: empleado.codigo,
      fechaRegistro: empleado.fechaRegistro,
    };
  }

  static toResponseList(empleados: Empleado[]): EmpleadoResponseDto[] {
    return empleados.map((empleado) => this.toResponse(empleado));
  }
}
