import { InputType, PartialType, Field } from '@nestjs/graphql';
import { createRestaurantDto } from './create-restaurant.dto';

@InputType()
class UpdateRestaurantInputType extends PartialType(createRestaurantDto) {}

@InputType()
export class UpdateRestaurantDto {
  @Field(type => Number)
  id: number;

  @Field(type => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
