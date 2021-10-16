import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import {CreateRestaurantDto} from './dtos/create-restaurant.dto';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  @Query((returns) => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
    return [];
  }
  
  @Mutation(returns => Boolean)
  createRestaurant(@Args() createRestaurant: CreateRestaurantDto): boolean{
    console.log(createRestaurant);
    return true;
  }
}
