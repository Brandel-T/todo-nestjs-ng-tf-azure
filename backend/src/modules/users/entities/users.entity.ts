import { Todo } from '@modules/todos/entities/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  displayName: string;

  @Column()
  picture: string;

  @OneToMany(() => Todo, (todo) => todo.author)
  todos?: Todo[];
}
