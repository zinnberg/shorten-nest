import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import { ShortenerAggregate } from './shortener.aggregate';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class ShortnerFactory {
    constructor(
        private readonly eventPublisher: EventPublisher,
        private readonly configService: ConfigService,
    ) {}

    create(
        originalUrl: string, 
        shortId: string,
        customerId: string,
        ctxId: string,
        subDomain?: string,
    ): ShortenerAggregate {
        const baseHost = this.configService.get('HOST');
        const host = subDomain ? `${subDomain}.${baseHost}` : baseHost;

        return this.eventPublisher.mergeObjectContext(new ShortenerAggregate({
            originalUrl,
            hash: shortId,
            createdAt: new Date(),
            host,
            customerId,
            ctxId,
        }));
    }

    reconsitute(        
        originalUrl: string, 
        shortId: string,
        customerId: string,
        ctxId: string,
        host: string,
    ): ShortenerAggregate {
        return this.eventPublisher.mergeObjectContext(new ShortenerAggregate({
            originalUrl,
            hash: shortId,
            createdAt: new Date(),
            host,
            customerId,
            ctxId,
        }));
    }
}