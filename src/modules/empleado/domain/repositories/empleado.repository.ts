import { Empleado } from '../entities/empleado.entity';

export interface EmpleadoRepository {
  save(empleado: Empleado): Promise<Empleado>;
  findById(id: string): Promise<Empleado | null>;
  findAll(): Promise<Empleado[]>;
  delete(id: string): Promise<void>;
  findByUsuario(usuario: string): Promise<Empleado | null>;

  findMaxConsecutivo(): Promise<number>;
}
