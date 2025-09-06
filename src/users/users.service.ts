import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';
import { UserResponseDto } from './dto/user-response.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existing = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existing) {
      throw new ConflictException('Email already exists');
    }
    const defaultRole = await this.rolesService.findByName('user');
    if (!defaultRole)
      throw new InternalServerErrorException('Default role "user" not found');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: defaultRole,
    });
    const savedUser = await this.usersRepository.save(user);
    // const { password, ...result } = savedUser;
    return new UserResponseDto(savedUser);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
