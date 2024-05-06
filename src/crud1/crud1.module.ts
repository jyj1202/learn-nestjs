import { Module } from '@nestjs/common';
import { Crud1Service } from './crud1.service';
import { Crud1Controller } from './crud1.controller';

@Module({
  controllers: [Crud1Controller],
  providers: [Crud1Service],
})
export class Crud1Module {}
