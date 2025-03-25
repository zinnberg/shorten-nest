import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Inject } from '@nestjs/common';

import { ViewShortLinkCommand } from './view.link.command';

import { SHORT_URL_REPO_INJECTION_TOKEN, ShortUrlRepositoryPort } from './../../domain/short.url.repository.port';

@CommandHandler(ViewShortLinkCommand)
export class ViewShortLinkCommandHandler implements ICommandHandler<ViewShortLinkCommand> {
    constructor(
        @Inject(SHORT_URL_REPO_INJECTION_TOKEN)
        private readonly shortUrlRepository: ShortUrlRepositoryPort,
    ) {}

    async execute(command: ViewShortLinkCommand): Promise<void> {
        const shortUrl = await this.shortUrlRepository.find(command.host, command.hash);

        if (!shortUrl) {
            // Todo: Just Log It
            throw new Error('Short URL not found');
        }
    
        shortUrl.view();
    }
}
