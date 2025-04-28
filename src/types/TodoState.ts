import TodoItem from '@/types/TodoItem';

type TodoState = {
  todos: TodoItem[];
  isLoading: boolean;
  error: Error | null;
};

export default TodoState;