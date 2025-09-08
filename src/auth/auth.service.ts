import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { AuthResponseDto } from './dto/authResponse.dto';
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
    // const { password: _, ...result } = user;
    return new AuthResponseDto('Login successful', access_token, user);
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    const access_token = await this.generateJwt(user);

    return new AuthResponseDto('Register successful', access_token, user);
  }

  async refreshToken(user) {
    const access_token = await this.generateJwt(user);
    return new AuthResponseDto('Refresh token successful', access_token, user);
  }
  private async generateJwt(user: UserResponseDto) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role?.name || 'user', // <-- fallback if role is missing
    };
    const access_token = await this.jwtService.signAsync(payload);
    return access_token;
  }
}
