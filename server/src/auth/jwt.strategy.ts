import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ERROR_MESSAGES } from '../shared/common.constants';
import { IUser } from '../shared/common.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.jwtSecret'),
    });
  }

  async validate(
    username: string,
    password: string,
  ): Promise<Omit<IUser, 'password'>> {
    const user = await this.authService.validateUser({ username, password });

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.UNAUTHORIZED);
    }

    return user;
  }
}
