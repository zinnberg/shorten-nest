import { 
    NestFactory,
} from '@nestjs/core';

import { Transport } from '@nestjs/microservices';

import { join } from 'path';

import { AppModule } from './app.module';

 async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.connectMicroservice({
        transport: Transport.GRPC,
        options: {
          package: 'urlshortener',
          protoPath: join(__dirname, 'shortener/interfaces/url-shortener.proto'),
          url: 'localhost:5000', 
        },
    });

    await app.startAllMicroservices();
    await app.listen(8080);
  }

  bootstrap();