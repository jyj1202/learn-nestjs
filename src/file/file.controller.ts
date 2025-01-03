import { Controller, Post, UseInterceptors, UploadedFile, Body, Get, Res, Param, Headers } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FileService } from './file.service';
import { join } from 'path';
import { createReadStream, statSync } from 'fs';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file.buffer, file.stream, '=============');
    
    return {
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
    };
  }

  @Post('chunk')
  @UseInterceptors(FileInterceptor('file'))
  async uploadChunk(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { index: number, hash: string, filename: string }
  ) {
    console.log(file.buffer, '=============', body);
    return await this.fileService.handleChunk(file, body);
  }

  @Post('merge')
  async mergeChunks(@Body() body: { hash: string, filename: string, size: number }) {
    return await this.fileService.mergeChunks(body);
  }

  @Get('upload-page')
  getUploadPage(@Res() res: Response) {
    res.sendFile(join(__dirname, '../../public/upload.html'));
  }

  @Get('chunk-upload-page')
  getChunkUploadPage(@Res() res: Response) {
    res.sendFile(join(__dirname, '../../public/chunk-upload.html'));
  }

  @Get('download/:filename')
  async downloadFile(
    @Param('filename') filename: string,
    @Headers() headers: Record<string, string>,
    @Res() res: Response,
  ) {
    const filePath = join(process.cwd(), 'uploads', filename);
    
    try {
      const stat = statSync(filePath);
      const fileSize = stat.size;
      const range = headers.range;

      if (range) {
        // 处理断点续传
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;

        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${filename}"`,
        });

        const stream = createReadStream(filePath, { start, end });
        stream.pipe(res);
      } else {
        // 普通下载
        res.writeHead(200, {
          'Content-Length': fileSize,
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${filename}"`,
        });

        const stream = createReadStream(filePath);
        stream.pipe(res);
      }
    } catch (error) {
      res.status(404).send('File not found');
    }
  }

  @Get('files')
  async getFileList() {
    return this.fileService.getFileList();
  }

  @Get('download-page')
  getDownloadPage(@Res() res: Response) {
    res.sendFile(join(__dirname, '../../public/download.html'));
  }
} 