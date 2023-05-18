import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ArrayNodesDto {
  @Field(() => String)
  nodeId: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  parentId: string;

  @Field(() => String, { nullable: true })
  previousSiblingId: string;
}
