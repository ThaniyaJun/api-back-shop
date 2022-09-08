import { ProductModule } from './modules/product/product.module';
import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { ConfigurationService } from 'src/shared/configuration/configuration.service';
import { CustomHttpModule } from './shared/http/custom-http.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ProductModule,
    SharedModule,
    CustomHttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'shop-db',
      entities: ['dist/entities/*{.ts,.js}'],
      synchronize: false,
    }),
  ],
  controllers: [
  ],
  providers: [],
})
export class AppModule {
  static port: number | string;
  static isDev: boolean;

  constructor(private readonly configurationService: ConfigurationService) {
    AppModule.port = AppModule.normalizePort(configurationService.port);
    AppModule.isDev = configurationService.isDevelopment;
  }

  private static normalizePort(val: number | string): number | string {
    const port: number = typeof val === 'string' ? parseInt(val, 10) : val;

    if (Number.isNaN(port)) {
      return val;
    }

    if (port >= 0) {
      return port;
    }

    throw new Error(`Port "${val}" is invalid.`);
  }
}
