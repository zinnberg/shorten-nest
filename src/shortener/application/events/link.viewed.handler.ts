import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { LinkViewedEvent } from '../../domain/events/link.view.event';

@EventsHandler(LinkViewedEvent)
export class LinkViewedEventHandler implements IEventHandler<LinkViewedEvent> {
    handle(event: LinkViewedEvent): void {
        console.log('Page viewed event received', event);
        //trigger update
    }
}