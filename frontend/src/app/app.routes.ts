import { Routes } from '@angular/router';
import { TodosComponent } from './features/todos/todos.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { AddTodoComponent } from './features/todos/add-todo/add-todo.component';
import { EditTodoComponent } from './features/todos/edit-todo/edit-todo.component';

export const routes: Routes = [
  { path: 'todos', component: TodosComponent, title: "ToDo list", },
  { path: 'new', component: AddTodoComponent, outlet: 'aside', title: "Add a ToDo" },
  { path: 'todos/edit/:id', component: EditTodoComponent, outlet: 'aside', title: "Edit a ToDo" },
  { path: '', redirectTo: '/todos', pathMatch: 'full', },
  { path: '**', component: PageNotFoundComponent, title: "404 Error - Page not found" },
];
