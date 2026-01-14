import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmpleadosController } from './infrastructure/controllers/empleados.controller';
import { EmpleadosService } from './application/empleados.service';
import { EmpleadoOrmEntity } from './infrastructure/persistence/empleado.orm-entity';
import { EmpleadoRepositoryImpl } from './infrastructure/persistence/empleado.repository.impl';
import { BcrypPasswordHasher } from './infrastructure/security/bcrypt-password-hasher';

@Module({
  imports: [TypeOrmModule.forFeature([EmpleadoOrmEntity])],
  controllers: [EmpleadosController],
  providers: [
    EmpleadosService,
    {
      provide: 'EmpleadoRepository',
      useClass: EmpleadoRepositoryImpl,
    },
    {
      provide: 'PasswordHasher',
      useClass: BcrypPasswordHasher,
    },
  ],
  exports: [EmpleadosService],
})
export class EmpleadosModule {}
