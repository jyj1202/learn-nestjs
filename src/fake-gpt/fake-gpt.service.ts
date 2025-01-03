import { Injectable } from '@nestjs/common';
import { CreateFakeGptDto } from './dto/create-fake-gpt.dto';
import { UpdateFakeGptDto } from './dto/update-fake-gpt.dto';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.QWEN_TURBO_API_KEY,
  baseURL: process.env.QWEN_TURBO_BASE_URL,
});

@Injectable()
export class FakeGptService {
  async create(createFakeGptDto: CreateFakeGptDto) {
    const { text } = createFakeGptDto;
    const stream = await openai.chat.completions.create({
      model: 'qwen-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: text },
      ],
      temperature: 0.8,
      top_p: 0.8,
      stream: true,
    });
    return stream;
  }

  findAll() {
    return `This action returns all fakeGpt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fakeGpt`;
  }

  update(id: number, updateFakeGptDto: UpdateFakeGptDto) {
    return `This action updates a #${id} fakeGpt`;
  }

  remove(id: number) {
    return `This action removes a #${id} fakeGpt`;
  }
}
