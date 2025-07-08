import { Component, ChangeDetectionStrategy, input, inject } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Todo } from '@models/todo.model';
import { RouterModule } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, DialogData } from 'app/shared/dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  standalone: true,
  imports: [
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomComponentComponent {
  todoService = inject(TodoService)
  readonly dialog = inject(MatDialog);

  todo = input.required<Todo>()

  onMarkDone() {
    if (this.todo().id) {
      this.todoService.updateTodo(this.todo().id!, {...this.todo()}).subscribe({
        next: (value) => {
          console.log(value);
        }
      });
    }
  }

  openDeleteDialog() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Todo',
        message: 'Are you sure you want to delete this todo?',
        confirmText: 'Yes',
        cancelText: 'Cancel',
        onAccept: () => {
          this.onDeleteTodo();
        },
      } as DialogData,
    });
  }

  private onDeleteTodo() {
    if (this.todo().id) {
      this.todoService.deleteTodo(this.todo().id!).subscribe({
        next: (_value) => {}
      });
    }
  }
}
