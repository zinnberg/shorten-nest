import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { FindShortenedUrlQuery } from "./find.shortened.url.query";

import { ShortenedUrlQueryImplement } from "../../infrastructure/query";

import { FindShortenedUrlResult } from "./find.shortened.url.result";

import { NotFoundException } from "@nestjs/common";

@QueryHandler(FindShortenedUrlQuery)
export class FindShortenedUrlQueryHandler implements IQueryHandler<FindShortenedUrlQuery> {
    constructor(
        private readonly shortenedUrlQueryImplement: ShortenedUrlQueryImplement
    ) {}
    
    async execute(query: FindShortenedUrlQuery): Promise<FindShortenedUrlResult | null> {
        const result = await this.shortenedUrlQueryImplement.list(query.shortenedUrl);

        if (result == null) {
            throw new NotFoundException('Shortened URL not found');
        }

        return result;
    }
}

