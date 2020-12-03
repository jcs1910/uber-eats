import { InputType, Field, ArgsType } from '@nestjs/graphql';
import { IsString, IsBoolean, Length } from 'class-validator';

@ArgsType()
export class createRestaurantDto {
  @Field(type => String)
  @Length(5, 20)
  @IsString()
  name: string;

  @Field(type => Boolean)
  @IsBoolean()
  isVegan: boolean;

  @Field(type => String)
  @IsString()
  address: string;

  @Field(type => String)
  @IsString()
  ownersName: string;
}
