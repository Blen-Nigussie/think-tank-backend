import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponse } from './dto/get-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      status: 'Pending',
    });
    return this.usersRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id }, relations: ['ideas', 'feedbacks'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async getProfile(userId: number): Promise<ProfileResponse> {
    const user = await this.findOneById(userId);
    const { password, ...profile } = user;
    return profile as ProfileResponse;
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<ProfileResponse> {
    const user = await this.findOneById(userId);
    if (updateProfileDto.email) user.email = updateProfileDto.email;
    if (updateProfileDto.name) user.name = updateProfileDto.name;
    if (updateProfileDto.bio) user.bio = updateProfileDto.bio;
    if (updateProfileDto.interests) user.interests = updateProfileDto.interests;
    if (updateProfileDto.status) user.status = updateProfileDto.status;
    await this.usersRepository.save(user);
    const { password, ...updatedProfile } = user;
    return updatedProfile as ProfileResponse;
  }

  async getLikes(userId: number): Promise<number> {
    const user = await this.findOneById(userId);
    return user.ideas.length; // Proxy for likes
  }

  async getContributions(userId: number): Promise<number> {
    const user = await this.findOneById(userId);
    const ideaCount = user.ideas.length;
    const feedbackCount = user.feedbacks.length;
    return ideaCount + feedbackCount;
  }

  async getFeedback(userId: number): Promise<string[]> {
    const user = await this.findOneById(userId);
    return [user.feedbacks.length > 0 ? user.feedbacks[0].content : 'The feedback given by the admin'];
  }

  async isAdmin(userId: number): Promise<boolean> {
    const user = await this.findOneById(userId);
    return user.role === 'admin';
  }
}