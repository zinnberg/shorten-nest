import { DatabaseService } from './../../../lib/db';

import { UrlEntity } from '../entities/url.entity';

import { ShortenerAggregate, ShortenerRequiredProperties } from './../../domain/shortener.aggregate';

export class ShortenerRepositoryImplement  {
    constructor(
        private readonly dbService: DatabaseService
    ) {}

    async save(shortener: ShortenerAggregate): Promise<ShortenerRequiredProperties> {
        return this
        .dbService
        .writeConnection
        .manager
        .getRepository(UrlEntity)
        .save({ 
            ...this.mapToEntity(shortener),
         }).then(this.mapToProps);
    }

    private mapToProps(shortenerEntity: UrlEntity): ShortenerRequiredProperties {
        return {
            originalUrl: shortenerEntity.originalUrl,
            shortenedUrl: shortenerEntity.shortenedUrl,
            createdAt: shortenerEntity.createdAt,
        };
    }

    private mapToEntity(shortener: ShortenerAggregate): UrlEntity {
        return {
            originalUrl: shortener.originalUrl,
            shortenedUrl: shortener.shortenedUrl,
            createdAt: shortener.createdAt,
        };
    }
}