import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class RestaurantResolver {
  @Query(returns => Boolean) // returns 아무 의미가 없음 / (() => Boolean) 또는 ((_ => Boolean) are both possible // arrow function을 만들기 위한 argument
  isPizzaGood(): Boolean {
    return true;
  }
}
