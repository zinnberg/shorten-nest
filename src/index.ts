import { 
    NestFactory,
} from '@nestjs/core';

import { Transport } from '@nestjs/microservices';

import { join } from 'path';

import { AppModule } from './app.module';

import { validateConfig } from './lib/config';

import { ConfigService } from '@nestjs/config';

 async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.connectMicroservice({
        transport: Transport.GRPC,
        options: {
          package: 'urlshortener',
          protoPath: join(__dirname, 'shortener/interfaces/url-shortener.proto'),
          url: configService.get('GRPC_PATH'), 
        },
    });

    await app.startAllMicroservices();
    await app.listen(configService.get<number>('HTTP_PORT') as number);
  }

  bootstrap();