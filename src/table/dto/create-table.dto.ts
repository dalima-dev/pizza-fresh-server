import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class CreateTableDto{
    @IsNumber()
    @IsPositive()
    @ApiProperty()
    number: number;
}
