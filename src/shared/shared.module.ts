import { Module, Global } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { CustomHttpModule } from './http/custom-http.module';
import { MapperService } from './mapper/mapper.service';

@Global()
@Module({
  providers: [ConfigurationService, MapperService],
  imports: [CustomHttpModule],
  exports: [ConfigurationService, MapperService],
})
export class SharedModule {}
