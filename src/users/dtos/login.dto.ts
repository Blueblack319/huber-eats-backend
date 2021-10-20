import { Field, ObjectType, PickType, InputType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { MutationOuput } from 'src/common/dtos/output.dto';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends MutationOuput {}
