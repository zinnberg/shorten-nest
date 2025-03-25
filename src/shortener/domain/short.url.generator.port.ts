export const SHORT_URL_GENERATION_INJECTION_TOKEN = Symbol('SHORT_URL_POLICY');

export interface ShortUrlGeneratorPort {
    generate(): string;
}