import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTableDto } from './dto/create-table.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TableService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): Promise<Table[]> {
    return this.prismaService.table.findMany();
  }

  findOne(id: string) {
    return this.prismaService.table.findUnique({ where: { id } });
  }

  create(dto: CreateTableDto): Promise<Table> {
    const data: Table = { ...dto };
    return this.prismaService.table.create({ data });
  }
}
