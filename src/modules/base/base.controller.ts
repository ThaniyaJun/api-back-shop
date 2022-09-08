import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import { HttpTransformInterceptor } from 'src/shared/interceptors/http-response.interceptor';

@Controller()
@UseFilters(HttpExceptionFilter)
@UseInterceptors(HttpTransformInterceptor)
export abstract class BaseController {}
