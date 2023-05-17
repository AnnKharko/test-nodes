import { Module } from '@nestjs/common';
import { NodesModule } from './nodes/nodes.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './core/graphql/graphql-config.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appDataSource } from './core/database/data-source';

@Module({
  imports: [
    NodesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        !process.env.NODE_ENV ? '.env' : `${process.env.NODE_ENV}.env`,
      ],
    }),
    TypeOrmModule.forRoot(appDataSource.options),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
  ],
})
export class AppModule {}
