import { IQuery } from '@nestjs/cqrs';

export class FindShortenedUrlQuery implements IQuery {
  constructor(readonly shortenedUrl: string) {}
}