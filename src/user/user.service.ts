import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async findById(id: string): Promise<User> {
    const record = await this.prismaService.user.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(`Registro com id ${id} nao encontrado!`);
    }
    return record;
  }

  findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  async create(dto: CreateUserDto): Promise<User> {
    delete dto.confirmPassword;
    const data: User = { ...dto };
    return await this.prismaService.user
      .create({ data })
      .catch(this.handleError);
  }

  handleError(error: Error) {
    console.log(error);
    return undefined;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    delete dto.confirmPassword;
    await this.findById(id);
    const data: Partial<User> = { ...dto };
    return this.prismaService.user.update({ where: { id }, data });
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prismaService.user.delete({ where: { id } });
  }
}
