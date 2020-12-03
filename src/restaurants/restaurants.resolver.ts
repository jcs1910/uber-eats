import { Restaurant } from './entities/restaurant.entity';
import { Args, Resolver, Mutation, Query } from '@nestjs/graphql';
import { RestaurantService } from './restaurants.service';

@Resolver(of => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query(returnts => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }
  @Mutation(returns => Boolean)
  createRestaurant(): boolean {
    return true;
  }
}
