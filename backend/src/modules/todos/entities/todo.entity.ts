import { User } from '@modules/users/entities/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  done: boolean;

  @OneToMany(() => Todo, (todo) => todo.id)
  subTasks?: Todo[];

  @ManyToOne(() => User, (user) => user.todos)
  author?: User;
}
