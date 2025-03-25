import { Controller, Get, Param, Res, Headers } from "@nestjs/common";

import { Response } from "express";

import { QueryBus, CommandBus } from "@nestjs/cqrs";

import { GrpcMethod } from "@nestjs/microservices";

import { FindShortenedUrlQuery } from "./../application/queries/find.shortened.url.query";

import { ShortenUrlCommand } from "./../application/commands/shorten.command";

import { ViewShortLinkCommand } from "./../application/commands/view.link.command";

interface ShortenUrlRequest {
    originalUrl: string;
    ctxId: string;
    customerId: string;
    subDomain?: string;
}

interface ShortenUrlResponse {
    shortenedUrl: string;
}

@Controller()
export class ShortenerController {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    @Get(':shortId')
    async redirect(
        @Param('shortId') shortId: string,
        @Headers('host') host: string,
        @Res() res: Response
    ) {
        try {
            const {
                originalUrl
            } = await this.queryBus.execute(new FindShortenedUrlQuery(host, shortId));

            this.commandBus.execute(new ViewShortLinkCommand(host, shortId));

            return res.redirect(301, originalUrl);
        } catch (error) {
        }
    }

    @GrpcMethod('UrlShortenerService', 'ShortenUrl')
    async shortenUrl(request: ShortenUrlRequest): Promise<ShortenUrlResponse> {
        try {
         
            const { shortenedUrl } = await this.commandBus.execute(
                new ShortenUrlCommand(
                    request.originalUrl, 
                    request.ctxId, 
                    request.customerId, 
                    request.subDomain
                )
            );
      
            return { shortenedUrl };
        } catch (error) {
            throw error;
        }
    }
}