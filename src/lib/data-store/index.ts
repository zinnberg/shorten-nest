import {     
    Global, 
    Module, 
    OnModuleDestroy, 
    OnModuleInit, 
    Injectable, 
} from "@nestjs/common";

import { Datastore } from '@google-cloud/datastore';

import { ConfigService } from "@nestjs/config";

@Global()
@Injectable()
export class DataStoreService implements OnModuleInit, OnModuleDestroy {
    readonly datastore: Datastore;

    constructor(
        private readonly config: ConfigService,
    ) {
        this.datastore = new Datastore({
            projectId: this.config.get('GCP_PROJECT_ID'),
        });
    }

    async onModuleInit(): Promise<void> {
        await this.datastore.initialize();
    }

    async onModuleDestroy(): Promise<void> {
        await this.datastore.close();
    }
}

@Module({
    exports: [
        DataStoreService,
    ],
})
export class DataStoreModule {}