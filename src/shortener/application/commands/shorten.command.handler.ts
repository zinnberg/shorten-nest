import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ShortenUrlCommand } from './shorten.command';

import { ShortnerFactory } from './../../domain/shortner.factory';

import { ShortenerRepositoryImplement } from './../../infrastructure/repo/shortener.repo';

import { ShortenerRequiredProperties } from './../../domain/shortener.aggregate';

@CommandHandler(ShortenUrlCommand)
export class ShortenUrlCommandHandler implements ICommandHandler<ShortenUrlCommand, ShortenerRequiredProperties> {
    constructor(
        private readonly shortnerFactory: ShortnerFactory,
        private readonly shortenerRepository: ShortenerRepositoryImplement,
    ){}

    async execute(command: ShortenUrlCommand): Promise<ShortenerRequiredProperties> {
        const shortener = this.shortnerFactory.create(command.originalUrl);
        return this.shortenerRepository.save(shortener);
    }
}