import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsBoolean, Length, IsOptional } from 'class-validator';

@ObjectType() // for graphql to auto generate schema
@Entity() // for typeorm to interact with postgresql DB
export class Restaurant {
  @Field((type) => Number) // for graphql to auto generate schema
  @PrimaryGeneratedColumn() // for typeorm to interact with postgresql DB table
  id: number;

  @Field((type) => String) // for graphql to auto generate schema
  @Column() // for typeorm to interact with postgresql DB
  @IsString()
  @Length(5, 10)
  name: string;

  @Field((type) => Boolean)
  @Column()
  @IsBoolean()
  isVegan: boolean;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  @Field((type) => String, { defaultValue: 'company' })
  @Column()
  @IsString()
  ownerName: string;

  @Field((type) => String, { nullable: true, defaultValue: 'test' })
  @Column({ default: 'test' })
  @IsOptional()
  @IsString()
  categoryName: string;
}
