import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return await this.prismaService.product.findMany();
  }

  async findById(id: string): Promise<Product> {
    const record = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!record) {
      throw new NotFoundException(`Registro com id ${id} nao encontrado!`);
    }
    return record;
  }

  findOne(id: string): Promise<Product> {
    return this.findById(id);
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const data: Product = { ...dto };
    return await this.prismaService.product.create({ data }).catch(handleError);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    await this.findById(id);
    const data: Partial<Product> = { ...dto };
    return this.prismaService.product
      .update({ where: { id }, data })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prismaService.product.delete({ where: { id } });
  }
}
