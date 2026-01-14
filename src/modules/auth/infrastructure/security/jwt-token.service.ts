import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../../domain/ports/token.service';

export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: object): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
