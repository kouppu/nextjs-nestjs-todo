import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/entities/user.entity';

export enum Status {
  needsAction,
  completed,
}

@Entity('tasks')
@Unique(['id', 'createdAt'])
export class Task {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  title: string;

  @Column('tinyint', { default: Status.needsAction })
  status: Status;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
