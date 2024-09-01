import { Test, TestingModule } from '@nestjs/testing';
import { FakeGptController } from './fake-gpt.controller';
import { FakeGptService } from './fake-gpt.service';

describe('FakeGptController', () => {
  let controller: FakeGptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FakeGptController],
      providers: [FakeGptService],
    }).compile();

    controller = module.get<FakeGptController>(FakeGptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
