import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodosService],
  controllers: [TodosController],
  exports: [TypeOrmModule],
})
export class TodosModule {}
