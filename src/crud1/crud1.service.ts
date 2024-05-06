import { Injectable } from '@nestjs/common';
import { CreateCrud1Dto } from './dto/create-crud1.dto';
import { UpdateCrud1Dto } from './dto/update-crud1.dto';

@Injectable()
export class Crud1Service {
  create(createCrud1Dto: CreateCrud1Dto) {
    return 'This action adds a new crud1';
  }

  findAll() {
    return `This action returns all crud1`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crud1`;
  }

  update(id: number, updateCrud1Dto: UpdateCrud1Dto) {
    return `This action updates a #${id} crud1`;
  }

  remove(id: number) {
    return `This action removes a #${id} crud1`;
  }
}
