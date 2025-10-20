import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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
}
