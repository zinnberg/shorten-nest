import { IQuery } from '@nestjs/cqrs';

export class FindShortenedUrlQuery implements IQuery {
  constructor(readonly host: string, readonly hash: string) {}
}