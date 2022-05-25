import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateOrderProductDto {
  @IsUUID()
  @ApiProperty({
    description: 'ID do produto',
    example: 'Ponha ID de algum produto aqui',
  })
  productId: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Quantidade de itens no pedido',
    example: 1,
  })
  quantity: number;

  @IsString()
  @ApiProperty({
    description: 'Observacoes de produto',
    example: 'Sem cebola',
  })
  description: string;
}
