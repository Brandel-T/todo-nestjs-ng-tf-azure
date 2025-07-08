import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';

@Controller('todos')
@ApiTags('ToDos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiParam({ type: String, name: 'id', required: true })
  getTodobyId(@Param('id') id: string): Promise<Todo | null> {
    return this.todoService.findById(id);
  }

  @Delete(':id')
  @ApiParam({ type: String, name: 'id', required: true })
  deleteTodoById(@Param('id') id: string) {
    return this.todoService.deleteById(id);
  }

  @Post()
  @ApiBody({ type: UpdateTodoDto, description: 'Todo payload for creation' })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Put(':id')
  @ApiParam({ type: String, name: 'id', required: true })
  @ApiBody({ type: UpdateTodoDto, description: 'Todo payload for update' })
  updateTodoById(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.updateTodo(id, updateTodoDto);
  }
}
