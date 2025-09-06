import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class AuthResponseDto {
  msg: string;
  user: UserResponseDto;
  accessToken: string;

  constructor(msg: string, token: string, user: any) {
    this.msg = msg;
    this.user = new UserResponseDto(user);
    this.accessToken = token;
  }
}
