import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { NodesService } from './nodes.services';
import { Nodes } from './entity/nodes.entity';
import { GraphQLUpload } from 'graphql-upload';
// import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { Stream } from 'stream';
import { CreateNodesDto } from './dto/create-nodes.dto';

export interface IFileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

@Resolver()
export class NodesResolver {
  constructor(private readonly nodesService: NodesService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => [Nodes])
  public async createNodesViaFile(
    @Args('file', { type: () => GraphQLUpload }) file: IFileUpload,
  ): Promise<Nodes> {
    return this.nodesService.createNodesViaFile(file);
  }

  @Mutation(() => Nodes)
  public async createNodes(
    @Args('createNodesDto', { type: () => CreateNodesDto })
    createNodesDto: CreateNodesDto,
  ): Promise<Nodes> {
    return this.nodesService.createNodes(createNodesDto);
  }

  @Query(() => [Nodes])
  getNodes(): Promise<Nodes[]> {
    return this.nodesService.getNodes();
  }
}
