import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('empleado')
export class EmpleadoOrmEntity {
  @PrimaryColumn({ length: 10 })
  id: string;

  @PrimaryGeneratedColumn('increment')
  consecutivo: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  usuario: string;

  @Column({ length: 255 })
  password: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'fecha_registro' })
  fechaRegistro: Date;

  @Column({ name: 'fecha_baja', type: 'timestamp', nullable: true })
  fechaBaja?: Date;

  @Column({ length: 25 })
  rol: string;

  @Column({ length: 6 })
  codigo: string;
}
