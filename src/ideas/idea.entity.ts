import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Feedback } from '../feedback/feedback.entity';

@Entity()
export class Idea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.ideas)
  user: User;

  @OneToMany(() => Feedback, (feedback) => feedback.idea)
  feedback: Feedback[];
}