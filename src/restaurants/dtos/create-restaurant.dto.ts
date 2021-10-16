import { Field, ArgsType } from '@nestjs/graphql';
import {Restaurant} from '../entities/restaurant.entity';
import {IsString, IsBoolean, Length} from 'class-validator';

@ArgsType()
export class CreateRestaurantDto {
  @Field((type) => String)
  @IsString()
  @Length(5, 10)
  name: string;

  @Field((type) => Boolean)
  @IsBoolean()
  isVegan: boolean;
  
  @Field(type => String)
  @IsString()
  address: string;
  
  @Field(type => String, {defaultValue: 'company'})
  @IsString()
  ownerName: string;
}