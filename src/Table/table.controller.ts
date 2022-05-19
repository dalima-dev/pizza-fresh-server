import { Controller, Get, Post } from '@nestjs/common';
import { table } from 'console';
import { TableService } from './table.service';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService){}

  @Get()
  findAll() {
    return this.tableService.findAll();
  }

  @Post()
  create(){
    return this.tableService.create()
  }
}
