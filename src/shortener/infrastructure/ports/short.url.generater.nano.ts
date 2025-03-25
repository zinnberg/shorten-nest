import { ShortUrlGeneratorPort } from "../../domain/short.url.generator.port";
import { nanoid } from "nanoid";

export class ShortUrlGeneratorNano implements ShortUrlGeneratorPort {
    generate(): string {
        return nanoid(7);
    }
}