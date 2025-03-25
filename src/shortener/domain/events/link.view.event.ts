import { IEvent } from '@nestjs/cqrs';

export class LinkViewedEvent implements IEvent {
  constructor(
    public readonly ctxId: string,
    public readonly customerId: string,
    public readonly originalUrl: string,
  ) {}
}