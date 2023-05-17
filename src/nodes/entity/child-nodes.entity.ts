import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Nodes } from './nodes.entity';

@ObjectType()
@Entity('child_nodes')
export class ChildNodes {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  nodeId: number;

  // @Field(() => String)
  // @Column()
  // nodeId: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  parentId: string;

  @Field(() => String)
  @Column()
  previousSiblingId: string;

  @Field(() => Nodes)
  @ManyToOne(() => Nodes, (nodes) => nodes.children)
  parent: Nodes;
}
