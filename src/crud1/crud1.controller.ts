import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Crud1Service } from './crud1.service';
import { CreateCrud1Dto } from './dto/create-crud1.dto';
import { UpdateCrud1Dto } from './dto/update-crud1.dto';

@Controller('crud1')
export class Crud1Controller {
  constructor(private readonly crud1Service: Crud1Service) {}

  @Post()
  create(@Body() createCrud1Dto: CreateCrud1Dto) {
    return this.crud1Service.create(createCrud1Dto);
  }

  @Get()
  findAll() {
    return this.crud1Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crud1Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrud1Dto: UpdateCrud1Dto) {
    return this.crud1Service.update(+id, updateCrud1Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crud1Service.remove(+id);
  }
}
