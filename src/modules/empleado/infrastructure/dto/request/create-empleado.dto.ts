import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class CreateEmpleadoDto {
  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsString()
  @Length(1, 100)
  usuario: string;

  @IsString()
  @Length(8, 255)
  password: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean = true;

  @IsString()
  @Length(1, 25)
  rol: string;

  @IsString()
  @Length(1, 6)
  codigo: string;
}
