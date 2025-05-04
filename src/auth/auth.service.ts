import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    if (!user || !user.email || !user.id) {
      throw new UnauthorizedException('Invalid user data: missing email or ID');
    }
    const userId = Number(user.id); // Ensure ID is a number
    if (isNaN(userId) || userId <= 0) {
      throw new UnauthorizedException('Invalid user ID');
    }
    const payload = { email: user.email, sub: userId, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(): Promise<{ message: string }> {
    return { message: 'Logged out successfully' };
  }
}