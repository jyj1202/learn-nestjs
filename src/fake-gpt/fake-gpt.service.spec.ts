import { Test, TestingModule } from '@nestjs/testing';
import { FakeGptService } from './fake-gpt.service';

describe('FakeGptService', () => {
  let service: FakeGptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakeGptService],
    }).compile();

    service = module.get<FakeGptService>(FakeGptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
