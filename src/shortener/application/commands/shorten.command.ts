import { ICommand } from '@nestjs/cqrs';

export class ShortenUrlCommand implements ICommand {
  constructor(
    readonly originalUrl: string,
    readonly ctxId: string,
    readonly customerId: string,
    readonly subDomain?: string,
  ) {}
}