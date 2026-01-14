import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import type { PasswordHasher } from '../../empleado/domain/ports/password-hasher.port';
import type { EmpleadoRepository } from '../../empleado/domain/repositories/empleado.repository';
import { LoginResponseDto } from '../infrastructure/controllers/dto/login-response.dto';
import type { TokenService } from '../domain/ports/token.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('EmpleadoRepository')
    private readonly empleadoRepository: EmpleadoRepository,

    @Inject('PasswordHasher')
    private readonly passwordHasher: PasswordHasher,

    @Inject('TokenService')
    private readonly tokenService: TokenService,
  ) {}

  async login(usuario: string, password: string): Promise<LoginResponseDto> {
    const empleado = await this.empleadoRepository.findByUsuario(usuario);

    if (!empleado || !empleado.activo) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const validPassword = await this.passwordHasher.compare(
      password,
      empleado.password,
    );

    if (!validPassword) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: empleado.id,
      usuario: empleado.usuario,
      rol: empleado.rol,
    };

    const accessToken = await this.tokenService.sign(payload);

    return {
      accessToken,
    };
  }
}
