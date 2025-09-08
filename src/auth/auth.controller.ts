import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Request as ExpressRequest } from 'express';

// Define a custom type for requests that include user
interface AuthRequest extends ExpressRequest {
  user: { id: number; email: string; name: string; role: string };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh-token')
  refreshToken(@Request() req: AuthRequest) {
    return this.authService.refreshToken(req.user);
  }
}
