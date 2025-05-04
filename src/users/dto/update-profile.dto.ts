import { IsString, IsEmail, IsOptional, IsArray } from 'class-validator';

export class UpdateProfileDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsArray()
  @IsOptional()
  interests?: string[];

  @IsString()
  @IsOptional()
  status?: string;
}