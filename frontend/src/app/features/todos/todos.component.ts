import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { CustomComponentComponent } from "./todo-item/todo-item.component";
import { Todo } from '../../models/todo.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
  imports: [
    MatTabsModule,
    CustomComponentComponent,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterModule,
  ],
  standalone: true,
})
export class TodosComponent {
  todoList = inject(TodoService).getTodoList;

  ongoingTasks: WritableSignal<Todo[]> = signal([])
  doneTasks: WritableSignal<Todo[]> = signal([])

  private checkTaskEffect = effect(() => {
    this.ongoingTasks.update((todo) => this.todoList().filter((item) => !item.done))
    this.doneTasks.update((todo) => this.todoList().filter((item) => item.done))
  })
}
