import { Controller, Post, Body, Get, Put, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from './user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponse } from './dto/get-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@GetUser() user: User): Promise<ProfileResponse> {
    return this.usersService.getProfile(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  updateProfile(
    @GetUser() user: User,
    @Body() updateProfileDto: UpdateProfileDto
  ): Promise<ProfileResponse> {
    return this.usersService.updateProfile(user.id, updateProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/likes')
  getLikes(@GetUser() user: User): Promise<number> {
    return this.usersService.getLikes(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/contributions')
  getContributions(@GetUser() user: User): Promise<number> {
    return this.usersService.getContributions(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/feedback')
  getFeedback(@GetUser() user: User): Promise<string[]> {
    return this.usersService.getFeedback(user.id);
  }
}