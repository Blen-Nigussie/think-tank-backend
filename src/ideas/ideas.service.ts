import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Idea } from './idea.entity';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class IdeasService {
  constructor(
    @InjectRepository(Idea)
    private ideasRepository: Repository<Idea>,
    private usersService: UsersService,
  ) {}

  async create(createIdeaDto: CreateIdeaDto, userId: number): Promise<Idea> {
    const user = await this.usersService.findOneById(userId);
    const idea = this.ideasRepository.create({
      ...createIdeaDto,
      user,
    });
    return this.ideasRepository.save(idea);
  }

  async findAll(): Promise<Idea[]> {
    return this.ideasRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Idea> {
    const idea = await this.ideasRepository.findOne({ where: { id }, relations: ['user'] });
    if (!idea) {
      throw new NotFoundException(`Idea with ID ${id} not found`);
    }
    return idea;
  }

  async update(id: number, updateIdeaDto: CreateIdeaDto, userId: number): Promise<Idea> {
    const idea = await this.findOne(id);
    if (idea.user.id !== userId) {
      throw new ForbiddenException('Not authorized to update this idea');
    }
    Object.assign(idea, updateIdeaDto);
    return this.ideasRepository.save(idea);
  }

  async remove(id: number, userId: number): Promise<void> {
    const idea = await this.findOne(id);
    if (idea.user.id !== userId) {
      throw new ForbiddenException('Not authorized to delete this idea');
    }
    await this.ideasRepository.remove(idea);
  }
}