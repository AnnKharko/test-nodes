import { Module } from '@nestjs/common';
import { NodesResolver } from './nodes.resolver';
import { NodesService } from './nodes.services';
import { NodesController } from './nodes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nodes } from './entity/nodes.entity';
import { ChildNodes } from './entity/child-nodes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nodes, ChildNodes])],
  providers: [NodesResolver, NodesService],
  controllers: [NodesController],
})
export class NodesModule {}
