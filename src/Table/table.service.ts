import { Injectable } from "@nestjs/common";

@Injectable()
export class TableService{
  findAll(){
    return 'findall'
  }
  create(){
    return 'create'
  }
}

