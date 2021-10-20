import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { UserService } from './users.service';
import { MutationOuput } from 'src/common/dtos/output.dto';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query((returns) => Boolean)
  hi() {
    return true;
  }

  @Mutation((returns) => MutationOuput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<MutationOuput> {
    try {
      const { ok, error } = await this.usersService.createAccount(
        createAccountInput,
      );
      return {
        ok,
        error,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Mutation((returns) => Boolean)
  async login(@Args('input') loginInput: LoginInput): Promise<boolean> {
    try {
      return true;
    } catch (e) {
      console.log(e);
    }
  }
}
