import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class UploadGuard implements CanActivate {
  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest() as FastifyRequest;
    const isMultipart = req.isMultipart();
    if (!isMultipart) throw new HttpException('multipart/form-data expected.', 400);
    return true;
  }
}

@Injectable()
export class UploadImagesGuard implements CanActivate {
  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest() as FastifyRequest;
    const req2 = ctx.switchToHttp().getRequest();
    const isMultipart = req.isMultipart();
    if (!isMultipart) throw new HttpException('multipart/form-data expected.', 400);
    // if (!req2.body.file || req2.body.file.length === 0) throw new HttpException('file not found.', 400);
    req2.body.file.forEach((f: any) => {
      if (f.mimetype.indexOf('image') === -1) {
        const message = `${f.filename} is invalid. Only accept document files or images`;
        throw new HttpException(message, 400);
      }
    });

    return true;
  }
}

@Injectable()
export class UploadDocumentGuard implements CanActivate {
  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest() as FastifyRequest;
    const req2 = ctx.switchToHttp().getRequest();
    const isMultipart = req.isMultipart();
    if (!isMultipart) throw new HttpException('multipart/form-data expected.', 400);
    if (!req2.body.file || req2.body.file.length === 0) throw new HttpException('file not found.', 400);

    const match = [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'application/vnd.rar',
      'application/zip',
      'application/x-7z-compressed',
      'application/pdf',
    ];

    req2.body.file.forEach((f: any) => {
      if (match.indexOf(f.mimetype) === -1) {
        const message = `${f.filename} is invalid. Only accept document files or images`;
        throw new HttpException(message, 400);
      }
    });

    return true;
  }
}
