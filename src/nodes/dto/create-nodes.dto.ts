import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNodesDto {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  parentId: string;

  @Field(() => String, { nullable: true })
  previousSiblingId: string;
}
