import { Module } from "@nestjs/common";

import { ShortenerController } from "./interfaces/shortener.interface"; 

import { CqrsModule } from "@nestjs/cqrs";

import { ShortenedUrlQueryImplement } from "./infrastructure/query";

import { FindShortenedUrlQueryHandler } from "./application/queries/find.shortened.url.query.handler";

import { ShortenUrlCommandHandler } from "./application/commands/shorten.command.handler";

import { ShortnerFactory } from "./domain/shortner.factory";

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
    ],
})
export class ShortenerModule {}