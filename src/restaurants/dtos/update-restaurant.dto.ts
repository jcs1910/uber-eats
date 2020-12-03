import { InputType, PartialType } from '@nestjs/graphql';
import { createRestaurantDto } from './create-restaurant.dto';

@InputType()
export class UpdateRestaurantDto extends PartialType(createRestaurantDto) {}
