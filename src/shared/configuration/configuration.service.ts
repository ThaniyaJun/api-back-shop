import { Injectable, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { decryptText } from 'src/utils/encryption';

@Injectable()
export class ConfigurationService {
  private readonly logger = new Logger('ConfigurationService');

  private currentEnv: string = process.env.NODE_ENV || 'development';

  constructor() {
    const result = dotenv.config();

    if (result.error) {
      throw result.error;
    }
  }

  get(key: string): string {
    return process.env[key];
  }

  get port(): string | number {
    return process.env.PORT || 3000;
  }

  get isDevelopment(): boolean {
    return this.currentEnv === 'development';
  }



  get getDBPassword(): string {
    try {
      return decryptText(this.get('DB_PASSWORD'));
    } catch (error) {
      return '';
    }
  }


  // get mysqlDBConfig(): any {
  //   return {
  //     type: 'mysql',
  //     replication: {
  //       master: {
  //         host: this.get('DB_HOST'),
  //         port: this.get('DB_PORT'),
  //         username: this.get('DB_USERNAME'),
  //         password: this.getDBPassword,
  //         database: this.get('DB_NAME'),
  //       },
  //       slaves: [
  //         {
  //           host: this.get('DB_HOST'),
  //           port: this.get('DB_PORT'),
  //           username: this.get('DB_USERNAME'),
  //           password: this.getDBPassword,
  //           database: this.get('DB_NAME'),
  //         },
  //         {
  //           host: this.get('DB_HOST'),
  //           port: this.get('DB_PORT'),
  //           username: this.get('DB_USERNAME'),
  //           password: this.getDBPassword,
  //           database: this.get('DB_NAME'),
  //         },
  //       ],
  //     },
  //     entities: ['dist/entities/*{.ts,.js}'],
  //     synchronize: false,
  //     cache: {
  //       duration: 1000 * 30, // 30 seconds
  //     },
  //     extra: {
  //       connectionLimit: 50,
  //     },
  //     // logging: ['query', 'error'],
  //     logging: ['query', 'error'],
  //   };
  // }

  // get JWT() {
  //   return {
  //     Key: process.env.JWT_SECRTE || 'DEMO_KEY',
  //     AccessTokenTtl: parseInt(process.env.JWT_EXPIRES_IN, 10) || 60 * 60, // 1hr
  //     Issuer: process.env.JWT_ISSUER,
  //   };
  // }
}
