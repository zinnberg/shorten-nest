import { ShortenerAggregate } from "../../domain/shortener.aggregate";
import { ShortUrlRepositoryPort } from "./../../domain/short.url.repository.port";
import { DataStoreService } from "../../../lib/data-store";
import { Transaction } from '@google-cloud/datastore';
import { Injectable } from "@nestjs/common";
import { ShortnerFactory } from "../../domain/shortner.factory";


@Injectable()
export class ShortUrlRepository implements ShortUrlRepositoryPort {
    constructor(
        private readonly db: DataStoreService,
        private readonly shortnerFactory: ShortnerFactory,
    ) {}

    private generateKey(subdomain: string, hash: string) {
        return this
            .db
            .datastore
            .key(['ShortLink', `${subdomain}:${hash}`]);
    }

    async save(shortener: ShortenerAggregate): Promise<void> {
        const key = this.generateKey(
            shortener.host, 
            shortener.hash
        );

        const entity = {
          key,
          data: {
            orignalUrl: shortener.originalUrl,
            customerId: shortener.customerId,
            ctxId: shortener.ctxId,
            createdAt: shortener.createdAt,
          },
        };

        await this.db.datastore.runInTransaction(async (transaction: Transaction) => {
            const [result] = await transaction.get(key);

            if (result) {
                throw new Error('Short URL already exists');
            }

            await transaction.save(entity);
        })

    }

    async find(host: string, hash: string): Promise<ShortenerAggregate | null> {
        const key = this.generateKey(
            host, 
            hash,
        );

        const [entity] = await this.db.datastore.get(key);
        
        if (!entity) return null;  
        
        return this.shortnerFactory.reconsitute(
            entity.orignalUrl,
            hash,
            entity.customerId,
            entity.ctxId,
            host,
        );
    }
}
