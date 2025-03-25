import { Inject } from '@nestjs/common';

import { SHORT_URL_REPO_INJECTION_TOKEN, ShortUrlRepositoryPort } from './../../domain/short.url.repository.port';

import { Injectable } from '@nestjs/common';

import { FindShortenedUrlResult } from "../../application/queries/find.shortened.url.result";

import { CACHE_PORT_INJECTION_TOKEN, CachePort } from "../../application/queries/cache-port";

@Injectable()
export class ShortenedUrlQueryImplement {
    constructor(
        // We Should Seperate Out The Read Model
        @Inject(SHORT_URL_REPO_INJECTION_TOKEN)
        private readonly shortUrlRepository: ShortUrlRepositoryPort,
        @Inject(CACHE_PORT_INJECTION_TOKEN)
        private readonly cachePort: CachePort,
    ) {}
    async get(host: string, hash: string): Promise<FindShortenedUrlResult | null> {
        const cacheResult = await this.cachePort.get(host, hash);

        if (cacheResult) {
            return cacheResult;
        }

        const shortUrl = await this.shortUrlRepository.find(host, hash);

        if (!shortUrl) {
            return null;
        }

        await this.cachePort.set(host, hash, shortUrl);

        return {
            originalUrl: shortUrl.originalUrl,
            createdAt: shortUrl.createdAt,
            shortenedUrl: shortUrl.shortenedUrl,
        };
    }
}