import { Resolver, Query } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entitiy';

@Resolver(of => Restaurant)
export class RestaurantResolver {
  @Query(returns => Restaurant)
  myRestaurant() {
    return true;
  }
}
