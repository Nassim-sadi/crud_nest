import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid password');
    }

    const access_token = await this.generateJwt(user);
    // remove password from user
    const { password: _, ...result } = user;
    return {
      msg: 'Login successful',
      user: result,
      access_token: access_token,
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    const access_token = await this.generateJwt(user);

    return { msg: 'Registration successful', user, access_token };
  }

  private async generateJwt(user: Omit<User, 'password'>) {
    const payload = { sub: user.id, email: user.email, name: user.name };
    const access_token = await this.jwtService.signAsync(payload);
    return access_token;
  }
}
