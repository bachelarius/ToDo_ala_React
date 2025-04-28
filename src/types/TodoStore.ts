import TodoItem from '@/types/TodoItem';
import TodoItemInput from '@/types/TodoItemInput';

interface TodoStore {
  getTodos(): TodoItem[];
  setTodos(todos: TodoItem[]): void;
  addTodo(todo: TodoItemInput): TodoItem;
  updateTodo(todo: Partial<TodoItem> & { id: number }): TodoItem;
  deleteTodo(id: number): void;
}

export default TodoStore;