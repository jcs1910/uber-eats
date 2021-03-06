import { Restaurant } from './entities/restaurant.entity';
import { Args, Resolver, Mutation, Query } from '@nestjs/graphql';
import { RestaurantService } from './restaurants.service';
import { createRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';

@Resolver(of => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query(returnts => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }
  @Mutation(returns => Boolean)
  async createRestaurant(
    @Args('input') createRestaurantDto: createRestaurantDto,
  ): Promise<boolean> {
    console.log(createRestaurantDto);
    try {
      await this.restaurantService.createRestuarant(createRestaurantDto);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @Mutation(returns => Boolean)
  async updateRestaurant(
    @Args('input') updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.updateRestaurant(updateRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
