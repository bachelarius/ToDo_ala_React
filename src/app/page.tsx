'use client'; 

import { useState, useEffect } from 'react'; 
import TodoItem from '@/types/TodoItem'; 
import { useTodoStore } from '@/contexts/TodoStoreContext'; 
import TodoList from '@/components/TodoList'; 
import CreateTodoForm from '@/components/CreateTodoForm'; 

export default function ToDoPage() { 
  const [todos, setTodos] = useState<TodoItem[]>([]); 
  const [newTodoTitle, setNewTodoTitle] = useState(''); 
  const todoStore = useTodoStore(); 

  useEffect(() => { 
    setTodos(todoStore.getTodos()); 
  }, [todoStore]); 

  const handleToggleComplete = (id: number) => { 
    const updatedTodos = todos.map(todo => { 
      if (todo.id === id) { 
        const updatedTodo = { 
          ...todo, 
          completed: !todo.completed,
          updatedAt: new Date() 
        };
        todoStore.updateTodo(updatedTodo);
        return updatedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleAddTodo = () => {
    if (!newTodoTitle.trim()) return;
    
    const newTodo: TodoItem = {
      id: Date.now(),
      title: newTodoTitle.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    todoStore.addTodo(newTodo);
    setTodos([...todos, newTodo]);
    setNewTodoTitle('');
  };

  const handleDeleteTodo = (id: number) => {
    todoStore.deleteTodo(id);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <main className="flex flex-col gap-[32px] items-center w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">
        Todo List
    </h1>
      <TodoList todos={todos}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTodo} />
      <CreateTodoForm newTodoTitle={newTodoTitle}
                   onTitleChange={setNewTodoTitle}
                   onAdd={handleAddTodo} />
    </main>
  );
}
