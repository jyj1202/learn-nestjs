import { PartialType } from '@nestjs/mapped-types';
import { CreateFakeGptDto } from './create-fake-gpt.dto';

export class UpdateFakeGptDto extends PartialType(CreateFakeGptDto) {}
