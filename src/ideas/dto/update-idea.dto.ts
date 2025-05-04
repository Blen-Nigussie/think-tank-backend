import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateIdeaDto {
  @IsString()
  @MinLength(5)
  @IsOptional()
  title: string;

  @IsString()
  @MinLength(10)
  @IsOptional()
  description: string;
}