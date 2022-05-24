import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsUUID } from 'class-validator';

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

  @IsUUID(undefined, { each: true })
  @ApiProperty({
    description: 'Lista com os IDs dos produtos que estao no pedido',
    example: '[]',
  })
  products: string[];
}
