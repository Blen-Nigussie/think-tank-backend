import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Idea } from '../ideas/idea.entity';
import { Feedback } from '../feedback/feedback.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ type: 'simple-array', nullable: true })
  interests: string[];

  @Column({ default: 'Pending' })
  status: string;

  @OneToMany(() => Idea, idea => idea.user)
  ideas: Idea[];

  @OneToMany(() => Feedback, feedback => feedback.user)
  feedbacks: Feedback[];
}