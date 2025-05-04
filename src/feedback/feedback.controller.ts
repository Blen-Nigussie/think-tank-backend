import { Controller, Post, Body, Get, Param, Put, Delete, Request, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto, @Request() req) {
    return this.feedbackService.create(createFeedbackDto, req.user.id);
  }

  @Get(':ideaId')
  findAllByIdea(@Param('ideaId') ideaId: string) {
    return this.feedbackService.findAllByIdea(+ideaId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto, @Request() req) {
    return this.feedbackService.update(+id, updateFeedbackDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.feedbackService.remove(+id, req.user.id);
  }
}