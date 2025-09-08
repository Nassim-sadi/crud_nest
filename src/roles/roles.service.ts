import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    await this.seedRoles();
  }
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    const role = this.roleRepository.findOne({ where: { id } });
    return role;
  }

  async findByName(name: string) {
    return this.roleRepository.findOne({ where: { name } });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }

  async seedRoles() {
    const roles = ['admin', 'user'];
    for (const name of roles) {
      const exists = await this.roleRepository.findOne({ where: { name } });
      if (!exists) {
        await this.roleRepository.save({ name });
      }
    }
  }
}
