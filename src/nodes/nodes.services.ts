import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Nodes } from './entity/nodes.entity';
import { CreateNodesDto } from './dto/create-nodes.dto';
import { IFileUpload } from './nodes.resolver';
import { createWriteStream } from 'fs';
import { GraphQLError } from 'graphql';
import { ArrayNodesDto } from './dto/array-nodes.dto';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class NodesService {
  constructor(
    @InjectRepository(Nodes) private nodesRepository: Repository<Nodes>,
  ) {}

  public async createNodes(createNodesDto: CreateNodesDto) {
    const createdNode = this.nodesRepository.create(createNodesDto);
    const saved = await this.nodesRepository.save(createdNode);
    return saved;
  }

  public async getNodes() {
    const parentNodes = await this.nodesRepository.find({
      where: { parentId: IsNull() },
    });
    const entitiesWithNestedChildren = await Promise.all(
      parentNodes.map((node) => this.loadNodesWithChildren(node.nodeId)),
    );

    return entitiesWithNestedChildren;
  }

  public async loadNodesWithChildren(id: string): Promise<Nodes> {
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

  //another way: deal only with array

  public loadChildren(parents: ArrayNodesDto[], nodeByParentId: any): Nodes[] {
    //for each parent adds field children if such key exists in nodeByParentId then assign the appropriate sorted array, otherwise assign empty array
    for (const parent of parents) {
      parent['children'] = nodeByParentId[parent.nodeId]
        ? nodeByParentId[parent.nodeId].sort(
            (a: any, b: any) => a.previousSiblingId - b.previousSiblingId,
          )
        : [];

      //calls itself recursively for the children array
      if (parent['children'].length) {
        this.loadChildren(parent['children'], nodeByParentId);
      }
    }
    return parents;
  }

  public convertArray(nodes: ArrayNodesDto[]): Nodes[] {
    //creates object where key is parentId and value is an array of all children
    const nodeByParentId = nodes.reduce((acc, value, _index, array) => {
      if (value.parentId && !acc[value.parentId]) {
        acc[value.parentId] = array.filter(
          (v) => v.parentId === value.parentId,
        );
      }

      return acc;
    }, {});

    // creates a sorted parent array
    const parents = nodes
      .filter((n) => !n.parentId)
      .sort((a: any, b: any) => a.nodeId - b.nodeId);

    //calls recursion function that adds an array of children to each parent
    return this.loadChildren(parents, nodeByParentId);
  }

  public async ReadNodesFromFile(file: IFileUpload) {
    await new Promise(async (resolve, reject) =>
      file
        .createReadStream()
        .pipe(createWriteStream(`./${file.filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    ).catch((e) => {
      throw new GraphQLError(e);
    });

    const fileContent = fs.readFileSync(`./${file.filename}`, 'utf8');
    const jsonData = JSON.parse(fileContent);
    fs.unlink(`./${file.filename}`, (err) => {
      if (err) throw new GraphQLError(err.message);
    });

    //for test I omit the check for whether each object is Nodes
    return this.convertArray(jsonData);
  }
}
