import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  create(dto: CreateOrderDto) {
    const data: Prisma.OrderCreateInput = {
      user: { connect: { id: dto.userId } },
      table: {connect: {number: dto.tableNumber}}
    };
    this.prismaService.order.create({ data }).catch(handleError);
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }
}
