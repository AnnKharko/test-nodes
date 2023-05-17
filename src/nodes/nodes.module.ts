import { Module } from '@nestjs/common';
import { NodesResolver } from './nodes.resolver';
import { NodesService } from './nodes.services';
import { NodesController } from './nodes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nodes } from './entity/nodes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nodes])],
  providers: [NodesResolver, NodesService],
  controllers: [NodesController],
})
export class NodesModule {}
