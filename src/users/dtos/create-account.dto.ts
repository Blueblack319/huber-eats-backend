import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { ClientRequest } from 'http';
import { User } from '../entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'role',
]) {}
