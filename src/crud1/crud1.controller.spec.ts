import { Test, TestingModule } from '@nestjs/testing';
import { Crud1Controller } from './crud1.controller';
import { Crud1Service } from './crud1.service';

describe('Crud1Controller', () => {
  let controller: Crud1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Crud1Controller],
      providers: [Crud1Service],
    }).compile();

    controller = module.get<Crud1Controller>(Crud1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
