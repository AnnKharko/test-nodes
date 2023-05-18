import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@ObjectType()
@Entity('nodes')
export class Nodes {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  nodeId: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  parentId?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  previousSiblingId?: string;

  @Field(() => [Nodes], { nullable: true })
  @OneToMany(() => Nodes, (childNodes) => childNodes.parent, {
    nullable: true,
  })
  children?: Nodes[];

  @ManyToOne(() => Nodes, (parentNode) => parentNode.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'parentId' })
  parent?: Nodes;
}
