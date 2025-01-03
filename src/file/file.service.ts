import { Injectable } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync, readdirSync, unlinkSync, statSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  async handleChunk(file: Express.Multer.File, body: { index: number, hash: string, filename: string }) {
    console.log(`Processing chunk ${body.index} for file ${body.filename}`);
    const chunkDir = join(process.cwd(), 'uploads/chunks', body.hash);
    
    if (!existsSync(chunkDir)) {
      mkdirSync(chunkDir, { recursive: true });
    }

    const chunkPath = join(chunkDir, `${body.index}`);
    const writeStream = createWriteStream(chunkPath);
    console.log(file.buffer);
    
    writeStream.write(file.buffer);
    writeStream.end();

    return { success: true };
  }

  async mergeChunks(body: { hash: string, filename: string, size: number }) {
    console.log(`Merging chunks for file ${body.filename}`);
    const chunkDir = join(process.cwd(), 'uploads/chunks', body.hash);
    const filePath = join(process.cwd(), 'uploads', body.filename);
    const writeStream = createWriteStream(filePath);
    
    const chunkFiles = readdirSync(chunkDir);
    chunkFiles.sort((a, b) => parseInt(a) - parseInt(b));

    for (const chunkFile of chunkFiles) {
      const chunkPath = join(chunkDir, chunkFile);
      const chunk = require('fs').readFileSync(chunkPath);
      writeStream.write(chunk);
      unlinkSync(chunkPath);
    }
    
    writeStream.end();
    return { success: true };
  }

  async getFileList() {
    const uploadDir = join(process.cwd(), 'uploads');
    try {
      const files = readdirSync(uploadDir);
      return Promise.all(
        files.map(async (filename) => {
          const filePath = join(uploadDir, filename);
          const stat = statSync(filePath);
          return {
            filename,
            size: stat.size,
            createTime: stat.birthtime,
            updateTime: stat.mtime,
          };
        }),
      );
    } catch (error) {
      return [];
    }
  }
} 