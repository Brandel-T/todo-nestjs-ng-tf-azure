import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../../models/todo.model';
import { TodoService } from '../services/todo.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.scss',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
})
export class EditTodoComponent implements OnInit {
  router = inject(Router)
  route = inject(ActivatedRoute)
  todoService = inject(TodoService)

  todo!: Todo

  todoForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', []),
    subTasks: new FormControl<Todo[]>([], []),
    done: new FormControl<boolean>(false, []),
  })

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (param) => {
        this.todoService.getTodoById(param['id']).subscribe((value) => {
          this.todo = value

          if (this.todo) {
            this.todoForm.setValue({
              description: this.todo.description ?? '',
              name: this.todo.name,
              subTasks: this.todo.subTasks ?? [],
              done: this.todo.done
            })
          }
        })
      },
      error: (err) => {
        alert('Unable to get Todo')
        console.error(err)
      }
    })
  }

  backToOverview() {
    this.router.navigateByUrl("/todos")
  }

  onSave() {
    if (this.todo) {
      this.todoService.updateTodo(this.todo.id!, {
        id: this.todo.id,
        done: this.todoForm.value.done,
        name: this.todoForm.value.name,
        description: this.todoForm.value.description,
        subTasks: this.todoForm.value.subTasks ?? [],
      } as Todo).subscribe({
        next: (_value) => {
          this.resetForm()
        },
        complete: () => {
          this.backToOverview()
        }
      })
    }
  }

  onCancel() {
    this.backToOverview()
    this.resetForm()
  }

  private resetForm() {
    this.todoForm.reset()
  }
}
