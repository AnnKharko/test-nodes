import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChildNodes } from './child-nodes.entity';

@ObjectType()
@Entity('nodes')
export class Nodes {
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

  @Field(() => [ChildNodes])
  @OneToMany(() => ChildNodes, (childNodes) => childNodes.parent, {
    eager: true,
  })
  children: ChildNodes[];
}
