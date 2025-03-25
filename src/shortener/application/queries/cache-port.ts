import { FindShortenedUrlResult } from "./find.shortened.url.result";

export const CACHE_PORT_INJECTION_TOKEN = Symbol('CACHE_PORT');

export interface CachePort {
    get(host: string, domain: string): Promise<FindShortenedUrlResult | null>;
    set(host: string, domain: string, value: FindShortenedUrlResult, ttl?: number): Promise<void>;
}

