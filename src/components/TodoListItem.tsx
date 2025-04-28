'use client';

import TodoItem from '@/types/TodoItem'; 

interface TodoListItemProps {
  todo: TodoItem;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoListItem({ todo, onToggleComplete, onDelete }: TodoListItemProps) {
  return (
    <li className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex items-center gap-3">
        <input type="checkbox"
               id={`todo-${todo.id}`}
               checked={todo.completed}
               className="w-5 h-5 rounded border-gray-300"
               onChange={() => onToggleComplete(todo.id)}
               aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`} />
        <label htmlFor={`todo-${todo.id}`}
               className={`${todo.completed ? 'line-through text-gray-500' : ''}`} >
          {todo.title}
        </label>
      </div>
      <button onClick={() => onDelete(todo.id)}
              className="p-1 text-red-500 hover:text-red-700 hover:cursor-pointer"
              aria-label={`Delete "${todo.title}"`}>
        Delete
      </button>
    </li>
  );
}
