import { RoleResponseDto } from 'src/roles/dto/role-response.dto';

export class UserResponseDto {
  id: number;
  email: string;
  name: string;
  isActive: boolean;
  role: RoleResponseDto | null;

  constructor(user: any) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.isActive = user.isActive;
    this.role = user.role ? new RoleResponseDto(user.role) : null;
  }
}
