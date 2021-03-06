import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UserService } from './users.service';

type MockRepository<T> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let service: UserService;
  let mailService: MailService;
  let userRepository: MockRepository<User>;
  let verificationRepository: MockRepository<Verification>;

  const mockRepository = () => ({
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
  });

  const mockJwtService = {
    sign: jest.fn(),
  };

  const mockMailService = {
    sendVerificationEmail: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Verification),
          useValue: mockRepository(),
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();
    service = moduleRef.get<UserService>(UserService);
    mailService = moduleRef.get<MailService>(MailService);
    userRepository = moduleRef.get(getRepositoryToken(User));
    verificationRepository = moduleRef.get(getRepositoryToken(Verification));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAccount', () => {
    const createAccountArgs = {
      email: 'email@email.com',
      password: 'password',
      role: 0,
    };

    it('should fail if user exists', async () => {
      userRepository.findOne.mockResolvedValue({
        id: 1,
        email: 'lalala@naver.com',
      });
      const result = await service.createAccount(createAccountArgs);
      expect(result).toMatchObject({
        ok: false,
        error: 'There is a user with that email already',
      });
    });

    it('should create a new user', async () => {
      userRepository.findOne.mockResolvedValue(undefined);
      userRepository.create.mockReturnValue(createAccountArgs);
      userRepository.save.mockResolvedValue(createAccountArgs);
      verificationRepository.create.mockReturnValue({
        user: createAccountArgs,
      });
      verificationRepository.save.mockResolvedValue({
        user: createAccountArgs,
        code: 'code',
      });

      const result = await service.createAccount(createAccountArgs);

      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.create).toHaveBeenCalledWith(createAccountArgs);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledWith(createAccountArgs);
      expect(verificationRepository.create).toHaveBeenCalledTimes(1);
      expect(verificationRepository.create).toHaveBeenCalledWith({
        user: createAccountArgs,
      });
      expect(verificationRepository.save).toHaveBeenCalledTimes(1);
      expect(verificationRepository.save).toHaveBeenCalledWith({
        user: createAccountArgs,
      });
      expect(mailService.sendVerificationEmail).toHaveBeenCalledTimes(1);
      expect(mailService.sendVerificationEmail).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
      );
      expect(result).toEqual({ ok: true });
    });

    it('should fail on exception', async () => {
      userRepository.findOne.mockRejectedValue(new Error());
      const result = await service.createAccount(createAccountArgs);
      expect(result).toEqual({ ok: false, error: "Couldn't create account" });
    });
  });

  describe('login', () => {
    let userRepository: MockRepository<User>;
    let service: UserService;
    let jwtService: JwtService;
    let mailService: MailService;

    const loginArgs = {
      email: 'test@test.com',
      password: 'test',
    };

    const mockRepository = () => ({
      findOne: jest.fn(),
      checkPassword: jest.fn(),
    });

    const mockJwtService = {
      sign: jest.fn(),
    };
    const mockMailService = {
      sendVerificationEmail: jest.fn(),
    };

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UserService,
          {
            provide: JwtService,
            useValue: mockJwtService,
          },
          {
            provide: getRepositoryToken(User),
            useValue: mockRepository(),
          },
          {
            provide: getRepositoryToken(Verification),
            useValue: mockRepository(),
          },
          {
            provide: MailService,
            useValue: mockMailService,
          },
        ],
      }).compile();
      userRepository = moduleRef.get(getRepositoryToken(User));
      service = moduleRef.get<UserService>(UserService);
      jwtService = moduleRef.get<JwtService>(JwtService);
    });

    it('should fail if user doesnt exist', async () => {
      userRepository.findOne.mockResolvedValue(undefined);
      const result = await service.login(loginArgs);
      expect(result).toEqual({
        ok: false,
        error: 'User not found.',
      });
    });

    it('should login with email and password', async () => {
      userRepository.findOne.mockResolvedValue();
      service.login(loginArgs);
    });
  });
  it.todo('userProfile');
  it.todo('editProfile');
  it.todo('verifyEmail');
  it.todo('removeAccount');
});
