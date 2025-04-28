import TodoItem from '@/types/TodoItem';
import TodoItemInput from '@/types/TodoItemInput';
import TodoStore from '@/types/TodoStore';

class LocalStorageTodoStore implements TodoStore { 
  private readonly STORAGE_KEY = 'todos';

  getTodos(): TodoItem[] {
    try {
      const todosJson = localStorage.getItem(this.STORAGE_KEY);
      if (!todosJson) return [];
      
      const todos = JSON.parse(todosJson);
      return todos.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
      }));
    } catch (error) {
      console.error('Failed to get todos from localStorage:', error);
      return [];
    }
  }

  setTodos(todos: TodoItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error);
      throw new Error('Failed to save todos');
    }
  }

  addTodo(todoInput: TodoItemInput): TodoItem {
    const todos = this.getTodos();
    const newTodo: TodoItem = {
      ...todoInput,
      id: Date.now(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.setTodos([...todos, newTodo]);
    return newTodo;
  }

  updateTodo(todoUpdate: Partial<TodoItem> & { id: number }): TodoItem {
    const todos = this.getTodos();
    const index = todos.findIndex(t => t.id === todoUpdate.id);
    
    if (index === -1) {
      throw new Error(`Todo with id ${todoUpdate.id} not found`);
    }

    const updatedTodo: TodoItem = {
      ...todos[index],
      ...todoUpdate,
      updatedAt: new Date(),
    };

    todos[index] = updatedTodo;
    this.setTodos(todos);
    return updatedTodo;
  }

  deleteTodo(id: number): void {
    const todos = this.getTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    
    if (filteredTodos.length === todos.length) {
      throw new Error(`Todo with id ${id} not found`);
    }

    this.setTodos(filteredTodos);
  }
}

export default LocalStorageTodoStore;