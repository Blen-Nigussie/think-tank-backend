import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Idea } from '../ideas/idea.entity';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.feedbacks)
  user: User;

  @ManyToOne(() => Idea, (idea) => idea.feedback)
  idea: Idea;
}