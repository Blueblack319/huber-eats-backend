/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsInt, IsDate } from 'class-validator';

@ObjectType()
export class CoreEntity {
  @Field((type) => Number)
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Field((type) => Date)
  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @Field((type) => Date)
  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
