import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT gerado pelo login',
    example: 'Ponha um token aqui',
  })
  token: string;

  @ApiProperty({
    description: 'Dados do usuario autenticado',
  })
  user: User;
}
