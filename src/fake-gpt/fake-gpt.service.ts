import { Injectable } from '@nestjs/common';
import { CreateFakeGptDto } from './dto/create-fake-gpt.dto';
import { UpdateFakeGptDto } from './dto/update-fake-gpt.dto';

@Injectable()
export class FakeGptService {
  create(createFakeGptDto: CreateFakeGptDto) {
    return createFakeGptDto.text
  }

  findAll() {
    return `This action returns all fakeGpt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fakeGpt`;
  }

  update(id: number, updateFakeGptDto: UpdateFakeGptDto) {
    return `This action updates a #${id} fakeGpt`;
  }

  remove(id: number) {
    return `This action removes a #${id} fakeGpt`;
  }
}
