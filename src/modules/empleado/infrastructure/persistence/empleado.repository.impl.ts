import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmpleadoRepository } from '../../domain/repositories/empleado.repository';
import { Empleado } from '../../domain/entities/empleado.entity';
import { EmpleadoOrmEntity } from './empleado.orm-entity';

@Injectable()
export class EmpleadoRepositoryImpl implements EmpleadoRepository {
  constructor(
    @InjectRepository(EmpleadoOrmEntity)
    private readonly repository: Repository<EmpleadoOrmEntity>,
  ) {}

  async save(empleado: Empleado): Promise<Empleado> {
    const orm = this.repository.create(empleado);
    const saved = await this.repository.save(orm);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Empleado | null> {
    const found = await this.repository.findOneBy({ id });
    return found ? this.toDomain(found) : null;
  }

  async findAll(): Promise<Empleado[]> {
    const list = await this.repository.find();
    return list.map((orm) => this.toDomain(orm));
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findMaxConsecutivo(): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('e')
      .select('MAX(e.consecutivo)', 'max')
      .getRawOne<{ max: number | null }>();

    return result?.max ?? 0;
  }

  async findByUsuario(usuario: string): Promise<Empleado | null> {
    const found = await this.repository.findOneBy({ usuario });

    return found ? this.toDomain(found) : null;
  }

  private toDomain(orm: EmpleadoOrmEntity): Empleado {
    return new Empleado(
      orm.id,
      orm.nombre,
      orm.usuario,
      orm.password,
      orm.activo,
      orm.rol,
      orm.codigo,
      orm.fechaRegistro,
      orm.fechaBaja,
      orm.consecutivo,
    );
  }
}
