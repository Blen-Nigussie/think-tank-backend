import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key',
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload); // Debug log
    if (!payload.sub || isNaN(Number(payload.sub))) {
      throw new UnauthorizedException('Invalid or missing user ID in token');
    }
    const user = await this.usersService.findOneById(Number(payload.sub));
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}