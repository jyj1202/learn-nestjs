import { Test, TestingModule } from '@nestjs/testing';
import { Crud1Service } from './crud1.service';

describe('Crud1Service', () => {
  let service: Crud1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Crud1Service],
    }).compile();

    service = module.get<Crud1Service>(Crud1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
