import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Todo } from '../../../models/todo.model';
import { MatSelectModule } from '@angular/material/select';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'add-todo',
  imports: [
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTodoComponent {
  todoForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', []),
    subTasks: new FormControl<Todo[]>([], []),
  })

  todoService = inject(TodoService)

  constructor(private readonly router: Router) {}

  createTodo() {
    const newTodo: Todo = {
      done: false,
      name: this.todoForm.value.name ?? '<no name>',
      description: this.todoForm.value.description ?? '',
      subTasks: this.todoForm.value.subTasks ?? [],
    }

    this.todoService.addTodo(newTodo).subscribe({
      next: (_value) => {
        this.resetForm()
      },
      complete: () => {
        this.backToOverview()
      }
    })
  }

  backToOverview() {
    this.router.navigateByUrl("/todos")
  }

  onCancel() {
    this.resetForm()
    this.backToOverview()
  }

  private resetForm() {
    this.todoForm.reset()
  }
}
