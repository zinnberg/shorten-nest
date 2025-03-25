import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

import { ConfigService } from '@nestjs/config';

import { Injectable, Global } from '@nestjs/common';

@Global()
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  readonly redisClient: RedisClientType;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.redisClient = createClient({
      url: this.configService.get('REDIS_URL'),
    });

    this.redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });
  }

  async onModuleInit() {
    try {
      await this.redisClient.connect();
    } catch (error) {
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.redisClient.quit();
    } catch (error) {
      throw error;
    }
  }
}


@Module({
    providers: [RedisService],
    exports: [RedisService]
  })
export class RedisModule {}