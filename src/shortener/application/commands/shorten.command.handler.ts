
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Inject } from '@nestjs/common';

import { ShortenUrlCommand } from './shorten.command';

import { ShortnerFactory } from './../../domain/shortner.factory';

import { ShortenerRequiredProperties } from './../../domain/shortener.aggregate';

import { SHORT_URL_GENERATION_INJECTION_TOKEN, ShortUrlGeneratorPort } from './../../domain/short.url.generator.port';

import { SHORT_URL_REPO_INJECTION_TOKEN, ShortUrlRepositoryPort } from './../../domain/short.url.repository.port';

@CommandHandler(ShortenUrlCommand)
export class ShortenUrlCommandHandler implements ICommandHandler<ShortenUrlCommand, ShortenerRequiredProperties> {
    constructor(
        private readonly shortnerFactory: ShortnerFactory,
        @Inject(SHORT_URL_GENERATION_INJECTION_TOKEN)
        private readonly shortUrlGenerator: ShortUrlGeneratorPort,
        @Inject(SHORT_URL_REPO_INJECTION_TOKEN)
        private readonly shortUrlRepository: ShortUrlRepositoryPort,
    ){}

    async execute(command: ShortenUrlCommand): Promise<ShortenerRequiredProperties> {
        const shortener = this.shortnerFactory.create(
            command.originalUrl,
            this.shortUrlGenerator.generate(),
            command.customerId,
            command.ctxId,
            command.subDomain,
        );

        await this.shortUrlRepository.save(shortener);

        return shortener;
    }
}