import { ICommand } from '@nestjs/cqrs';

export class ShortenUrlCommand implements ICommand {
  constructor(
    readonly originalUrl: string,
  ) {}
}