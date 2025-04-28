import TodoItem from '@/types/TodoItem';

type TodoItemInput = Omit<TodoItem, 'id' | 'createdAt' | 'updatedAt'>;

export default TodoItemInput;