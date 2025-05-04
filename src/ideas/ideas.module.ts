import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeasService } from './ideas.service';
import { IdeasController } from './ideas.controller';
import { Idea } from './idea.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Idea]), UsersModule],
  providers: [IdeasService],
  controllers: [IdeasController],
  exports: [IdeasService], // Export for FeedbackService
})
export class IdeasModule {}