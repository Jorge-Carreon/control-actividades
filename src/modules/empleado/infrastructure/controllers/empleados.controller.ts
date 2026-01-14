import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { EmpleadosService } from '../../application/empleados.service';
import { CreateEmpleadoDto } from '../dto/request/create-empleado.dto';
import { UpdateEmpleadoDto } from '../dto/request/update-empleado.dto';
import { EmpleadoMapper } from '../dto/mapper/empleado-mapper.dto';

@Controller('empleados')
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) {}

  @Post()
  create(@Body() dto: CreateEmpleadoDto) {
    return this.empleadosService.create({
      nombre: dto.nombre,
      usuario: dto.usuario,
      password: dto.password,
      activo: dto.activo ?? true,
      rol: dto.rol,
      codigo: dto.codigo,
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const empleado = await this.empleadosService.findById(id);

    return EmpleadoMapper.toResponse(empleado);
  }

  @Get()
  async findAll() {
    const empleadoList = await this.empleadosService.findAll();
    return EmpleadoMapper.toResponseList(empleadoList);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEmpleadoDto) {
    return this.empleadosService.update(id, {
      nombre: dto.nombre,
      usuario: dto.usuario,
      password: dto.password,
      activo: dto.activo,
      rol: dto.rol,
      codigo: dto.codigo,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.empleadosService.delete(id);
  }
}
