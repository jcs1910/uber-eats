import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  // Graphql 관점에서 본 Restaurant가 어떻게 생겼는지 묘사
  @Field(type => String)
  name: string;

  @Field(type => Boolean, { nullable: true })
  isGood?: boolean;
}
