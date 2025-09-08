import { RoleResponseDto } from 'src/roles/dto/role-response.dto';

export class UserResponseDto {
  id: number;
  email: string;
  name: string;
  isActive: boolean;
  role: RoleResponseDto;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: any) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.isActive = user.isActive;
    this.role = new RoleResponseDto(user.role);
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
