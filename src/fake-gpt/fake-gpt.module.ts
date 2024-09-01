import { Module } from '@nestjs/common';
import { FakeGptService } from './fake-gpt.service';
import { FakeGptController } from './fake-gpt.controller';

@Module({
  controllers: [FakeGptController],
  providers: [FakeGptService],
})
export class FakeGptModule {}
