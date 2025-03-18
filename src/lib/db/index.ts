import { 
    Global, 
    Module, 
    OnModuleDestroy, 
    OnModuleInit, 
    Injectable,
} from '@nestjs/common';

import {
    DataSource,
    EntityManager,
    EntityTarget,
    ObjectLiteral,
    QueryRunner,
    Repository,
    SelectQueryBuilder,
} from 'typeorm';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { UrlEntity } from './../../shortener/infrastructure/entities/url.entity';


interface WriteConnection {
    readonly startTransaction: (
        level?:
        | 'READ UNCOMMITTED'
        | 'READ COMMITTED'
        | 'REPEATABLE READ'
        | 'SERIALIZABLE',
    ) => Promise<void>;
    readonly commitTransaction: () => Promise<void>;
    readonly rollbackTransaction: () => Promise<void>;
    readonly isTransactionActive: boolean;
    readonly manager: EntityManager;
}

interface ReadConnection {
    readonly getRepository: <T extends ObjectLiteral>(
        target: EntityTarget<T>,
    ) => Repository<T>;
    readonly query: (query: string) => Promise<void>;
    readonly createQueryBuilder: <Entity extends ObjectLiteral>(
        entityClass: EntityTarget<Entity>,
        alias: string,
        queryRunner?: QueryRunner,
    ) => SelectQueryBuilder<Entity>;
}

@Global()
@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    dataSource: DataSource;
    readConnection: ReadConnection;
    writeConnection: WriteConnection;

    constructor(){
        this.dataSource = new DataSource({
            type: 'postgres',
            entities: [UrlEntity],
            logging: true,
            host: '',
            port: 5432,
            database: '',
            username: '',
            password: '',
            synchronize: false,
            namingStrategy: new SnakeNamingStrategy(),
        });
    }


    async onModuleInit(): Promise<void> {
        await this.dataSource.initialize();
        if (!this.dataSource.isInitialized){
            throw new Error('DataSource is not initialized');
        }
                
        this.readConnection = this.dataSource.manager;
        this.writeConnection = this.dataSource.createQueryRunner();
    }

    async onModuleDestroy(): Promise<void> {
        await this.dataSource.destroy();
    }
}

@Global()
@Module({
    providers: [DatabaseService],
    exports: [DatabaseService]
}) export class DatabaseModule {}