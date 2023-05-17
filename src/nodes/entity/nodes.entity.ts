import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
// import { ChildNodes } from './child-nodes.entity';

@ObjectType()
@Entity('nodes')
export class Nodes {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  nodeId: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  parentId?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  previousSiblingId?: string;

  // @Field(() => [ChildNodes])
  // @OneToMany(() => ChildNodes, (childNodes) => childNodes.parent, {
  //   eager: true,
  // })
  // children: ChildNodes[];

  @Field(() => [Nodes], { nullable: true })
  @OneToMany(() => Nodes, (childNodes) => childNodes.parent, {
    // eager: true,
    nullable: true,
  })
  children?: Nodes[];

  // @Field(() => Nodes, { nullable: true })
  @ManyToOne(() => Nodes, (parentNode) => parentNode.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'parentId' })
  parent?: Nodes;
}
