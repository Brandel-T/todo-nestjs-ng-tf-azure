export interface Todo {
  id?: string
  name: string
  description?: string
  done: boolean
  subTasks?: Todo[]
}
