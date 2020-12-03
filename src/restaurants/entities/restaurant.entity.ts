import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, Length, IsBoolean, IsOptional } from 'class-validator';

@ObjectType() // ObjectType for graphql
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(type => Number)
  id: number;

  @Field(type => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field(type => Boolean, { nullable: true })
  @Column({ default: true })
  @IsOptional()
  @IsBoolean()
  isVegan: boolean;

  @Field(type => String)
  @Column()
  @IsString()
  address: string;

  // @Field(type => String)
  // @Column()
  // ownerName: string;

  // @Field(type => String)
  // @Column()
  // categoryName: string;
}
