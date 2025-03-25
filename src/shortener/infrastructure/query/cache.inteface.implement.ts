import { RedisService } from "../../../lib/redis";

import { CachePort } from "../../application/queries/cache-port";

import { FindShortenedUrlResult } from "../../application/queries/find.shortened.url.result";

import { Injectable } from "@nestjs/common";

@Injectable()
export class RedisCacheInteface implements CachePort {
    constructor(
        private readonly redisService: RedisService,
    ) {}
    private generateKey(host: string, domain: string): string {
        return `${host}:${domain}`;
    }
    async get(host: string, domain: string): Promise<FindShortenedUrlResult | null> {
        const result = await this.redisService.redisClient.get(
            this.generateKey(host, domain)
        );

        return result ? JSON.parse(result) : null;
    }
    async set(host: string, domain: string, value: FindShortenedUrlResult, ttl?: number): Promise<void> {
        await this.redisService.redisClient.set(
            this.generateKey(host, domain), 
            JSON.stringify(value), 
            { EX: ttl }
        );
    }
}
