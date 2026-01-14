import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './application/auth.service';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { EmpleadosModule } from '../empleado/empleados.module';
import { JwtStrategy } from './infrastructure/security/jwt.strategy';
import { JwtTokenService } from './infrastructure/security/jwt-token.service';

@Module({
  imports: [
    EmpleadosModule,
    JwtModule.register({
      secret: 'SUPER_SECRET_KEY', // luego va a env
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: 'TokenService',
      useClass: JwtTokenService,
    },
  ],
})
export class AuthModule {}
