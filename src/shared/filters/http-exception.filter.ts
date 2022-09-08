import { ExceptionFilter, Catch, ArgumentsHost, HttpException, NotFoundException } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch(HttpException, NotFoundException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus();
    const ex = exception.getResponse();
    response.status(status).send({
      statusCode: status,
      success: status < 300,
      message: status === 400 ? ex : exception.message,
      data: [],
    });
  }
}
