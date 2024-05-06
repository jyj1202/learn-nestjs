import { PartialType } from '@nestjs/mapped-types';
import { CreateCrud1Dto } from './create-crud1.dto';

export class UpdateCrud1Dto extends PartialType(CreateCrud1Dto) {}
