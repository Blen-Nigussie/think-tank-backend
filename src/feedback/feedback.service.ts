import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { IdeasService } from '../ideas/ideas.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    private ideasService: IdeasService,
    private usersService: UsersService,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto, userId: number): Promise<Feedback> {
    const user = await this.usersService.findOneById(userId);
    if (!user) throw new NotFoundException('User not found');
    const idea = await this.ideasService.findOne(createFeedbackDto.ideaId);
    if (!idea) throw new NotFoundException('Idea not found');
    const feedback = this.feedbackRepository.create({
      ...createFeedbackDto,
      user,
      idea,
    });
    return this.feedbackRepository.save(feedback);
  }

  async findAllByIdea(ideaId: number): Promise<Feedback[]> {
    const idea = await this.ideasService.findOne(ideaId);
    if (!idea) throw new NotFoundException('Idea not found');
    return this.feedbackRepository.find({
      where: { idea: { id: ideaId } },
      relations: ['user', 'idea'],
    });
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto, userId: number): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!feedback) throw new NotFoundException('Feedback not found');
    if (feedback.user.id !== userId && !await this.usersService.isAdmin(userId)) {
      throw new ForbiddenException('Not authorized to update this feedback');
    }
    Object.assign(feedback, updateFeedbackDto);
    return this.feedbackRepository.save(feedback);
  }

  async remove(id: number, userId: number): Promise<void> {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!feedback) throw new NotFoundException('Feedback not found');
    if (feedback.user.id !== userId && !await this.usersService.isAdmin(userId)) {
      throw new ForbiddenException('Not authorized to delete this feedback');
    }
    await this.feedbackRepository.remove(feedback);
  }
}