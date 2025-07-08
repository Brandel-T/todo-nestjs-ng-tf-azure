import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { TodoApiService } from "@core/todo-api.service";
import { Todo } from "@models/todo.model";
import { switchMap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TodoService {
  todoApi = inject(TodoApiService)

  private todos = signal<Todo[]>([{
    done: false,
    name: "test",
    description: "dknfdhgp",
    id: "1",
    subTasks: [],
  }])

  getTodoList = computed(() => this.todos())
  todoList = signal<Todo[]>([])

  constructor() {
    this.initializeTodos();

    effect(() => {
      this.todoList.update((todos) => [...this.todos(), ...todos])
    })
  }

  getTodos() {
    return this.todoApi.getAllTodos().pipe(
      switchMap(async (value) => this.todos.update((todos) => [...value, ...todos]))
    )
  }

  getTodoById(id: string) {
    return this.todoApi.getTodoById(id)
  }

  addTodo(newTodo: Todo) {
    return this.todoApi.createTodo(newTodo).pipe(
      switchMap(async (value) => this.todos.update((todos) => [...todos, value]))
    )
  }

  deleteTodo(id: string) {
    return this.todoApi.deleteTodo(id).pipe(
      switchMap(async (value) => this.todos.update((todos) => todos.filter((todo) => todo.id != id)))
    )
  }

  updateTodo(id: string, updatedTodo: Todo) {
    return this.todoApi.updateTodo(id, updatedTodo).pipe(
      switchMap(async (value) => this.todos.update((todos) => todos.map((todo) => todo.id == id ? value : todo)))
    )
  }

  private initializeTodos() {
    this.todoApi.getAllTodos().subscribe({
      next: (todos) => {
        this.todos.set(todos)
      },
      error: (err) => {
        console.error("Failed to fetch todos:", err);
      },
    });
  }
}
