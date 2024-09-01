import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FakeGptModule } from './fake-gpt/fake-gpt.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'test1',
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    FakeGptModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
