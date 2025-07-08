import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Todo } from "@models/todo.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TodoApiService {
  private readonly http = inject(HttpClient);

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiURI}/todos`);
  }

  getTodoById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${environment.apiURI}/todos/${id}`)
  }

  createTodo(todo: Todo): Observable<any> {
    return this.http.post<Todo>(`${environment.apiURI}/todos`, todo)
  }

  updateTodo(id: string, todo: Todo): Observable<any> {
    return this.http.put(`${environment.apiURI}/todos/${id}`, todo)
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${environment.apiURI}/todos/${id}`)
  }
}