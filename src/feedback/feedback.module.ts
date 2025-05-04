import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { Feedback } from './feedback.entity';
import { UsersModule } from '../users/users.module';
import { IdeasModule } from '../ideas/ideas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback]), UsersModule, IdeasModule],
  providers: [FeedbackService],
  controllers: [FeedbackController],
})
export class FeedbackModule {}