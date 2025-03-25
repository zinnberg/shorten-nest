import { Inject } from '@nestjs/common';

import { SHORT_URL_REPO_INJECTION_TOKEN, ShortUrlRepositoryPort } from './../../domain/short.url.repository.port';

import { Injectable } from '@nestjs/common';

import { FindShortenedUrlResult } from "../../application/queries/find.shortened.url.result";

@Injectable()
export class ShortenedUrlQueryImplement {
    constructor(
        // We Should Seperate Out The Read Model
        @Inject(SHORT_URL_REPO_INJECTION_TOKEN)
        private readonly shortUrlRepository: ShortUrlRepositoryPort,
    ) {}
    async get(host: string, hash: string): Promise<FindShortenedUrlResult | null> {
        const shortUrl = await this.shortUrlRepository.find(host, hash);

        if (!shortUrl) {
            return null;
        }

        return {
            originalUrl: shortUrl.originalUrl,
            createdAt: shortUrl.createdAt,
            shortenedUrl: shortUrl.shortenedUrl,
        };
    }
}