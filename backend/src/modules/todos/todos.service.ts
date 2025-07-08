import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.description = createTodoDto.description!;
    todo.done = false;
    todo.name = createTodoDto.name;
    todo.subTasks = [];

    return this.todoRepo.save(todo);
  }

  findAll(): Promise<Todo[]> {
    return this.todoRepo.find();
  }

  findById(id: string): Promise<Todo | null> {
    return this.todoRepo.findOneBy({ id });
  }

  async deleteById(id: string) {
    return this.todoRepo.delete(id);
  }

  async updateTodo(id: string, updatedTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todoRepo.findOneBy({ id });
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }

    const updatedTodo = {
      description: updatedTodoDto.description!,
      done: updatedTodoDto.done,
      id: todo.id,
      name: updatedTodoDto.name,
    } as Todo;

    return this.todoRepo.save(updatedTodo);
  }
}
