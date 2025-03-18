import { AggregateRoot } from "@nestjs/cqrs";

export type ShortenerRequiredProperties = Readonly<
  Required<{
    createdAt: Date;
    originalUrl: string;
    shortenedUrl: string;
  }>
>;
export class ShortenerAggregate extends AggregateRoot {
    createdAt: Date;
    originalUrl: string;
    shortenedUrl: string;

    static generateShortenedUrl(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 7;
        let result = '';
        
        const randomValues = new Uint32Array(length);
        crypto.getRandomValues(randomValues);
        
        for (let i = 0; i < length; i++) {
            const randomIndex = randomValues[i] % characters.length;
            result += characters.charAt(randomIndex);
        }
        
        return result;
    }

    constructor(shortenerProperties: ShortenerRequiredProperties) {
        super();

        this.originalUrl = shortenerProperties.originalUrl;
        this.shortenedUrl = shortenerProperties.shortenedUrl;
        this.createdAt = shortenerProperties.createdAt;
    }

    regenerateShortenedUrl(): void {
        this.shortenedUrl = ShortenerAggregate.generateShortenedUrl();
        // Todo: Add Domain Event
    }
}