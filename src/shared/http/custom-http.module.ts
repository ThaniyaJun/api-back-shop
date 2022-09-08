import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { HttpService, HttpModule as BaseHttpModule } from '@nestjs/axios';
import { CustomHttpService } from './custom-http.service';

@Module({
  imports: [BaseHttpModule],
  exports: [BaseHttpModule, CustomHttpService],
  providers: [CustomHttpService],
})
export class CustomHttpModule implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  public onModuleInit(): any {
    const logger = new Logger('Axios');
    const axios = this.httpService.axiosRef;
    axios.interceptors.request.use(function (config) {
      config['metadata'] = { ...config['metadata'], startDate: new Date() };
      return config;
    });
    axios.interceptors.response.use(
      (response) => {
        const { config } = response;
        config['metadata'] = { ...config['metadata'], endDate: new Date() };
        const duration = config['metadata'].endDate.getTime() - config['metadata'].startDate.getTime();

        logger.log(`${config.method.toUpperCase()} ${config.url} ${duration}ms`);

        return response;
      },
      (err) => {
        return Promise.reject(err.response);
      },
    );
  }
}
