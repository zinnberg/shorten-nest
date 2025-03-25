import { Module } from "@nestjs/common";

import { ShortenerController } from "./interfaces/shortener.interface"; 

import { CqrsModule } from "@nestjs/cqrs";

import { ShortenedUrlQueryImplement } from "./infrastructure/query";

import { FindShortenedUrlQueryHandler } from "./application/queries/find.shortened.url.query.handler";

import { ShortenUrlCommandHandler } from "./application/commands/shorten.command.handler";

import { ShortnerFactory } from "./domain/shortner.factory";

import { SHORT_URL_GENERATION_INJECTION_TOKEN } from "./domain/short.url.generator.port";

import { ShortUrlGeneratorNano } from "./infrastructure/ports/short.url.generater.nano";

import { ShortUrlRepository } from "./infrastructure/repo/short-url.repo";

import { SHORT_URL_REPO_INJECTION_TOKEN } from "./domain/short.url.repository.port";

import { ViewShortLinkCommandHandler } from "./application/commands/view.link.command.handler";

@Module({
    imports: [CqrsModule],
    controllers: [
        ShortenerController,
    ],
    providers: [
        FindShortenedUrlQueryHandler,
        ShortenedUrlQueryImplement,
        ShortenUrlCommandHandler,
        ShortnerFactory,
        ViewShortLinkCommandHandler,
        { 
            provide: SHORT_URL_GENERATION_INJECTION_TOKEN, 
            useClass: ShortUrlGeneratorNano,
        },
        {
            provide: SHORT_URL_REPO_INJECTION_TOKEN,
            useClass: ShortUrlRepository,
        },
    ],
})
export class ShortenerModule {}