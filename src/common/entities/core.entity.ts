import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field } from '@nestjs/graphql';
import { IsInt, IsDate } from 'class-validator';

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
