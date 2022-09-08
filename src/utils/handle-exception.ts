import { BadRequestException, HttpException, InternalServerErrorException, Logger } from '@nestjs/common';

export const handleException = (err: any) => {
  Logger.error(err, 'ERROR');
  if (!(err instanceof HttpException)) throw new BadRequestException({ [err.code]: err.message });
  if (err instanceof BadRequestException) throw new BadRequestException(err);
  if (err instanceof InternalServerErrorException) throw new InternalServerErrorException(err);
  throw err;
};
