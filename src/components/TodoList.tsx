'use client';

import TodoItem from '@/types/TodoItem';
import TodoListItem from '@/components/TodoListItem';

interface TodoListProps {
  todos: TodoItem[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
  error?: Error | null;
}

export default function TodoList({ 
  todos, 
  onToggleComplete, 
  onDelete, 
  isLoading = false,
  error = null 
}: TodoListProps) {
  if (isLoading) {
    return <div>Loading todos...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (todos.length === 0) {
    return <div>No todos yet. Add one above!</div>;
  }

  return (
    <ul className="w-full space-y-3">
      {todos.map((todo) => (
        <TodoListItem key={todo.id} 
                      todo={todo} 
                      onToggleComplete={onToggleComplete} 
                      onDelete={onDelete} />
      ))}
    </ul>
  );
}
