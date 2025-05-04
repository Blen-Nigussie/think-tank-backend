import { Controller, Post, Body, Get, Param, Put, Delete, Request, UseGuards } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createIdeaDto: CreateIdeaDto, @Request() req) {
    return this.ideasService.create(createIdeaDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.ideasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ideasService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateIdeaDto: UpdateIdeaDto, @Request() req) {
    return this.ideasService.update(+id, updateIdeaDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.ideasService.remove(+id, req.user.id);
  }
}