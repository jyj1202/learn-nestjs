import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Header } from '@nestjs/common';
import type { Response } from 'express'; // Assuming that we are using the ExpressJS HTTP Adapter
import { FakeGptService } from './fake-gpt.service';
import { CreateFakeGptDto } from './dto/create-fake-gpt.dto';
import { UpdateFakeGptDto } from './dto/update-fake-gpt.dto';

@Controller('fake-gpt')
export class FakeGptController {
  constructor(private readonly fakeGptService: FakeGptService) {}

  @Post()
  @Header('Content-Type', 'application/text')
  create(@Body() createFakeGptDto: CreateFakeGptDto) {
    return this.fakeGptService.create(createFakeGptDto);
  }

  @Get()
  findAll() {
    return this.fakeGptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fakeGptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFakeGptDto: UpdateFakeGptDto) {
    return this.fakeGptService.update(+id, updateFakeGptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fakeGptService.remove(+id);
  }
}
