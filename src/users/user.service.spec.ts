import { Test } from '@nestjs/testing';
import { UserService } from './users.service';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService],
    }).compile();
    service = moduleRef.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('createAccount');
  it.todo('userProfile');
  it.todo('editProfile');
  it.todo('login');
  it.todo('verifyEmail');
  it.todo('removeAccount');
});
