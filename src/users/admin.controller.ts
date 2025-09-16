import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { FindUsersDto } from './dto/find-users.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('admin/users')
@UseGuards(RolesGuard, JwtAuthGuard)
// @Roles('admin')
export class AdminControllerTsController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: FindUsersDto) {
    return this.usersService.findAll(query);
  }
}
