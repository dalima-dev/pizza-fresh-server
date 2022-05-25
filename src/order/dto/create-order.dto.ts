import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive, IsUUID, ValidateNested } from 'class-validator';
import { CreateOrderProductDto } from './create-order-product.dto';

export class CreateOrderDto {
  @IsUUID()
  @ApiProperty({
    description: 'ID do usuario que esta criando o pedido',
    example: 'Ponha ID de algum usuario aqui',
  })
  userId: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Numero da mesa que esta realizando o pedido',
    example: 1,
  })
  tableNumber: number;

  @ValidateNested({
    each: true,
  })
  @Type(() => CreateOrderProductDto)
  @ApiProperty({
    description: 'Lista com os IDs dos produtos que estao no pedido',
    type: [CreateOrderProductDto],
  })
  products: CreateOrderProductDto[];
}
