export interface ITodo {
  id?: string;
  name: string;
  description?: string;
  done: boolean;
  subTasks?: ITodo[];
}
