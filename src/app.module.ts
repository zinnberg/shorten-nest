import {
    MiddlewareConsumer,
    Module,
    NestModule,
  } from '@nestjs/common';

import { ShortenerModule } from './shortener/shortener.module';

import { DataStoreModule } from './lib/data-store';

import { ConfigModule } from '@nestjs/config';

import {resolve} from 'path'

import { validateConfig } from './lib/config';

@Module({
    imports: [
        ShortenerModule,
        DataStoreModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [resolve(__dirname, '..','.env')],
            validate: validateConfig,
        })
    ],
    controllers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {}
 };