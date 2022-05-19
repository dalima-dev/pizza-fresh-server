import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TableService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Table[]> {
    return await this.prismaService.table.findMany();
  }

  async findById(id: string): Promise<Table> {
    const record = await this.prismaService.table.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(`Registro com id ${id} nao encontrado!`);
    }
    return record;
  }

  findOne(id: string): Promise<Table> {
    return this.findById(id);
  }

  async create(dto: CreateTableDto): Promise<Table> {
    const data: Table = { ...dto };
    return await this.prismaService.table
      .create({ data })
      .catch(this.handleError);
  }

  handleError(error: Error) {
    console.log(error);
    return undefined;
  }

  async update(id: string, dto: UpdateTableDto): Promise<Table> {
    await this.findById(id);
    const data: Partial<Table> = { ...dto };
    return this.prismaService.table.update({ where: { id }, data });
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prismaService.table.delete({ where: { id } });
  }
}
