'use client';

import { FormEvent } from 'react';
import TodoItemInput from '@/types/TodoItemInput';

interface CreateTodoFormProps {
  newTodoTitle: string;
  onTitleChange: (title: string) => void;
  onAdd: (todo: TodoItemInput) => void;
  isSubmitting?: boolean;
}

export default function CreateTodoForm({ 
  newTodoTitle, 
  onTitleChange, 
  onAdd,
  isSubmitting = false 
}: CreateTodoFormProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim() || isSubmitting) return;

    const newTodo: TodoItemInput = {
      title: newTodoTitle.trim(),
      completed: false,
    };

    onAdd(newTodo);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <div className="flex items-center gap-4">
        <input type="text" 
               value={newTodoTitle} 
               onChange={(e) => onTitleChange(e.target.value)} 
               placeholder="Add new todo..." 
               className="flex-1 p-2 border rounded" 
               disabled={isSubmitting} 
               aria-label="New todo title" />
        <button type="submit"
                disabled={!newTodoTitle.trim() || isSubmitting}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300" >
          {isSubmitting ? 'Adding...' : 'Add Todo'}
        </button>
      </div>
    </form>
  );
}
