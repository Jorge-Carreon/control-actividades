import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { EmpleadoRepository } from '../domain/repositories/empleado.repository';
import { Empleado } from '../domain/entities/empleado.entity';
import type { PasswordHasher } from '../domain/ports/password-hasher.port';

@Injectable()
export class EmpleadosService {
  constructor(
    @Inject('EmpleadoRepository')
    private readonly empleadoRepository: EmpleadoRepository,

    @Inject('PasswordHasher')
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async create(data: Omit<Empleado, 'id' | 'consecutivo'>): Promise<Empleado> {
    const maxConsecutivo = await this.empleadoRepository.findMaxConsecutivo();
    const nuevoConsecutivo = maxConsecutivo + 1;

    const consecutivoString = nuevoConsecutivo.toString().padStart(3, '0');
    const id = `EMP${consecutivoString}`;

    const hashedPassword = await this.passwordHasher.hash(data.password);

    const empleado = new Empleado(
      id,
      data.nombre,
      id,
      hashedPassword,
      data.activo,
      data.rol,
      data.codigo,
      undefined,
      undefined,
      nuevoConsecutivo,
    );

    return this.empleadoRepository.save(empleado);
  }

  async findById(id: string): Promise<Empleado> {
    const empleado = await this.empleadoRepository.findById(id);
    if (!empleado) {
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    }
    return empleado;
  }

  async findAll(): Promise<Empleado[]> {
    return this.empleadoRepository.findAll();
  }

  async update(id: string, data: Partial<Empleado>): Promise<Empleado> {
    const empleado = await this.findById(id);

    Object.assign(empleado, data);

    return this.empleadoRepository.save(empleado);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.empleadoRepository.delete(id);
  }
}
