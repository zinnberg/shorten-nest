import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import { ShortenerAggregate } from './shortener.aggregate';

@Injectable()
export class ShortnerFactory {
    constructor(
        private readonly eventPublisher: EventPublisher,
    ) {}

    create(originalUrl: string): ShortenerAggregate {
        return this.eventPublisher.mergeObjectContext(new ShortenerAggregate({
            originalUrl,
            shortenedUrl: ShortenerAggregate.generateShortenedUrl(),
            createdAt: new Date(),
        }));
    }
}
