import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Nodes } from './entity/nodes.entity';
import { CreateNodesDto } from './dto/create-nodes.dto';

@Injectable()
export class NodesService {
  constructor(
    @InjectRepository(Nodes) private nodesRepository: Repository<Nodes>, //   private dataSource: DataSource,
  ) {}
  public async createNodesViaFile(file: any) {
    const created = this.nodesRepository.create({});
    const saved = await this.nodesRepository.save(created);
    return saved;
  }

  public async createNodes(createNodesDto: CreateNodesDto) {
    const createdNode = this.nodesRepository.create(createNodesDto);
    const saved = await this.nodesRepository.save(createdNode);
    return saved;
  }

  public async getNodes() {
    // return await this.nodesRepository.find({
    //   where: { parentId: IsNull() },
    //   relations: ['children'],
    // });

    const parentNodes = await this.nodesRepository.find({
      where: { parentId: IsNull() },
    });
    const entitiesWithNestedChildren = await Promise.all(
      parentNodes.map((node) => this.loadNodesWithChildren(node.nodeId)),
    );

    return entitiesWithNestedChildren;
  }

  public async loadNodesWithChildren(id: number): Promise<Nodes> {
    const node = await this.nodesRepository.findOne({
      where: { nodeId: id },
      relations: ['children'],
    });

    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        node.children[i] = await this.loadNodesWithChildren(
          node.children[i].nodeId,
        );
      }
    }

    return node;
  }
}
