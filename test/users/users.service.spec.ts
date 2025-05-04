import { Test } from '@nestjs/testing';
import { UsersService } from '../../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/users/user.entity';
import { Repository } from 'typeorm';
import { createTestingModule } from '../setup';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module = await createTestingModule();
    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should create a user', async () => {
    const createUserDto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      role: 'user',
    };
    jest.spyOn(repository, 'create').mockReturnValue(createUserDto as any);
    jest.spyOn(repository, 'save').mockResolvedValue(createUserDto as any);
    const result = await service.create(createUserDto);
    expect(result).toEqual(createUserDto);
  });
});