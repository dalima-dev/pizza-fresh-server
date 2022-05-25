import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { nickname, password } = loginDto;

    const user = await this.prisma.user.findUnique({ where: { nickname } });
    if (!user) throw new UnauthorizedException('Usuario e/ou senha invalidos');

    const isHashValid = await bcrypt.compare(password, user.password);
    if (!isHashValid)
      throw new UnauthorizedException('Usuario e/ou senha invalidos');

    delete user.password;

    return {
      token: 'Teste',
      user,
    };
  }
}
