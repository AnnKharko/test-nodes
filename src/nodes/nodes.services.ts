import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nodes } from './entity/nodes.entity';
import { ChildNodes } from './entity/child-nodes.entity';

@Injectable()
export class NodesService {
  constructor(
    @InjectRepository(Nodes) private nodesRepository: Repository<Nodes>, //   private dataSource: DataSource,
    @InjectRepository(ChildNodes)
    private childNodesRepository: Repository<ChildNodes>,
  ) {}
  public async createNodesViaFile(file: any) {
    const created = this.nodesRepository.create({});
    const saved = await this.nodesRepository.save(created);
    return saved;
  }
}
