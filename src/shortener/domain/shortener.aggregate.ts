import { AggregateRoot } from "@nestjs/cqrs";

import { LinkViewedEvent } from "./events/link.view.event";
import { ShortUrlGeneratorPort } from "./short.url.generator.port";

export type ShortenerRequiredProperties = Readonly<
  Required<{
    createdAt: Date;
    originalUrl: string;
    hash: string;
    host: string;
    customerId: string;
    ctxId: string;
  }>
>;
export class ShortenerAggregate extends AggregateRoot {
    createdAt: Date;
    originalUrl: string;
    hash: string;
    host: string;
    customerId: string;
    ctxId: string;
    shortenedUrl: string;

    constructor(shortenerProperties: ShortenerRequiredProperties) {
        super();
        this.originalUrl = shortenerProperties.originalUrl;
        this.hash = shortenerProperties.hash;
        this.createdAt = shortenerProperties.createdAt;
        this.host = shortenerProperties.host;
        this.customerId = shortenerProperties.customerId;
        this.ctxId = shortenerProperties.ctxId;
        this.shortenedUrl = this.generateShortenedUrl();
    }

    private generateShortenedUrl(): string {
        return `https://${this.host}/${this.hash}`;
    }

    regenerate(shortUrlGenerator: ShortUrlGeneratorPort): void {
        this.hash = shortUrlGenerator.generate();
        this.shortenedUrl = this.generateShortenedUrl();
    }

    view(): void {
        this.apply(new LinkViewedEvent(
            this.ctxId, 
            this.customerId, 
            this.originalUrl
        ));
    }
}