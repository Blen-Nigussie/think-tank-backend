import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateFeedbackDto {
  @IsString()
  @MinLength(5)
  @IsOptional()
  comment: string;
}