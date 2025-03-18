import {
    MiddlewareConsumer,
    Module,
    NestModule,
  } from '@nestjs/common';

import { ShortenerModule } from './shortener/shortener.module';

import { DatabaseModule } from './lib/db';

@Module({
    imports: [
        ShortenerModule,
        DatabaseModule,
    ],
    controllers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {}
 };