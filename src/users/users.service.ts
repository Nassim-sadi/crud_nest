import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';
import { UserResponseDto } from './dto/user-response.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { PaginatedResponseDto } from 'src/common/dtos/paginated-response.dto';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  onModuleInit() {
    this.seedUsers();
  }

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

  async findAll(
    dto: FindUsersDto,
  ): Promise<PaginatedResponseDto<UserResponseDto>> {
    const { search, createdStart, createdEnd, status, page, limit } = dto;

    try {
      const qb = this.usersRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'role')
        .addSelect(['role.id', 'role.name']);

      if (search) {
        qb.andWhere('(user.name LIKE :search OR user.email LIKE :search)', {
          search: `%${search}%`,
        });
      }

      if (createdStart) {
        qb.andWhere('user.createdAt >= :createdStart', { createdStart });
      }

      if (createdEnd) {
        qb.andWhere('user.createdAt <= :createdEnd', { createdEnd });
      }

      if (status !== undefined) {
        const isActive = Boolean(status);
        qb.andWhere('user.status = :isActive', { isActive });
      }

      qb.orderBy('user.createdAt', 'DESC');
      const [users, total] = await qb
        .take(limit)
        .skip((page - 1) * limit)
        .getManyAndCount();

      const mapped = users.map((user) => new UserResponseDto(user));

      return new PaginatedResponseDto(mapped, total, page, limit);
    } catch (error) {
      throw new BadRequestException(`Query failed: ${error.message}`);
    }
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    return new UserResponseDto(user);
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async seedUsers() {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const users = [
      {
        email: 'test@example.com',
        password: hashedPassword,
        name: 'Admin',
        role: { id: 1 },
      },
    ];

    for (const user of users) {
      const existing = await this.usersRepository.findOneBy({
        email: user.email,
      });
      if (!existing) {
        await this.usersRepository.save(user);
      }
    }
  }
}
