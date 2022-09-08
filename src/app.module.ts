import { ProductModule } from './module/product/product.module';
import { ProductController } from './module/product/product.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
