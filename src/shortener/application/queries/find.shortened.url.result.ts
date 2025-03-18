import { IQueryResult } from '@nestjs/cqrs';

export class FindShortenedUrlResult implements IQueryResult {
  readonly shortenedUrl: string;
  readonly originalUrl: string;
  readonly createdAt: Date;
}