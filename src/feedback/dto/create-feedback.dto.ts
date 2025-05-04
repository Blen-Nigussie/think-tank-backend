import { IsString, MinLength, IsInt } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @MinLength(5)
  comment: string;

  @IsInt()
  ideaId: number;
}