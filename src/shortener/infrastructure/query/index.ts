import { Injectable } from '@nestjs/common';

import {UrlEntity} from './../entities/url.entity';

import { DatabaseService } from './../../../lib/db';

import { FindShortenedUrlResult } from "../../application/queries/find.shortened.url.result";

@Injectable()
export class ShortenedUrlQueryImplement {
    constructor(
        private dbService: DatabaseService    
    ) {}
    async list(shortenedUrl: string): Promise<FindShortenedUrlResult | null> {
        return this.dbService.readConnection
            .getRepository(UrlEntity)
            .findOne({
                where: {
                    shortenedUrl: shortenedUrl,
                },
            })
            .then((result) => {
                if (result == null) {
                    return null;
                }

                return {
                    originalUrl: result.originalUrl,
                    createdAt: result.createdAt,
                    shortenedUrl: result.shortenedUrl,
                };
            });
    }
}