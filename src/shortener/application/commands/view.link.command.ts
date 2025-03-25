export class ViewShortLinkCommand {
    constructor(
      public readonly hash: string,
      public readonly host: string,
    ) {}
}
  