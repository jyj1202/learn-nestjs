import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import type { Response } from 'express'; // Assuming that we are using the ExpressJS HTTP Adapter
import { FakeGptService } from './fake-gpt.service';
import { CreateFakeGptDto } from './dto/create-fake-gpt.dto';
import { UpdateFakeGptDto } from './dto/update-fake-gpt.dto';

@Controller('conversation')
export class FakeGptController {
  constructor(private readonly fakeGptService: FakeGptService) {}

  @Post()
  // @Header('Content-Type', 'application/text')
  async create(
    @Body() createFakeGptDto: CreateFakeGptDto,
    @Res() res: Response,
  ) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // 将 headers 立即发送到客户端

    try {
      const stream = await this.fakeGptService.create(createFakeGptDto);

      // 逐块读取流数据并发送给客户端
      for await (const chunk of stream as any) {
        const content = chunk.choices[0]?.delta?.content || '';
        res.write(`data: ${content}\n\n`);
      }

      res.write('event: end\n');
      res.write('data: [DONE]\n\n');
      res.end(); // 关闭连接
    } catch (error) {
      res.write('event: error\n');
      res.write(`data: ${JSON.stringify(error)}\n\n`);
      res.end();
    }
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
