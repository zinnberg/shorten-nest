import { ShortenerAggregate } from "./shortener.aggregate";

export const SHORT_URL_REPO_INJECTION_TOKEN = Symbol('SHORT_URL_REPO');

export interface ShortUrlRepositoryPort {
    save(shortener: ShortenerAggregate): void;
    find(host: string, hash: string): Promise<ShortenerAggregate | null>;
}
