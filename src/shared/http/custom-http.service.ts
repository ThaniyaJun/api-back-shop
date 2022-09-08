import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { lastValueFrom, map, Observable } from 'rxjs';

@Injectable()
export class CustomHttpService {
  constructor(private readonly customhttpService: HttpService) {}

  private async serialize(p: Observable<AxiosResponse<any, any>>): Promise<any> {
    try {
      return await lastValueFrom(p.pipe(map((x) => x.data)));
    } catch (error) {
      throw error;
    }
  }

  public handleHttpError(error: any, observe = false) {
    console.log(error);

    const { status, data: rawData } = error || {};
    const { errorMessage, message, error: pError } = rawData || {};
    const stCode = status === 500 ? 400 : status;
    if (observe) return rawData;
    throw new HttpException(errorMessage || pError || message, stCode);
  }

  async get(url: string, config?: AxiosRequestConfig<any>): Promise<any> {
    return await this.serialize(this.customhttpService.get(url, config));
  }

  async post(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<any> {
    return await this.serialize(this.customhttpService.post(url, data, config));
  }

  async put(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<any> {
    return await this.serialize(this.customhttpService.put(url, data, config));
  }

  async delete(url: string, config?: AxiosRequestConfig<any>): Promise<any> {
    return await this.serialize(this.customhttpService.delete(url, config));
  }
}
