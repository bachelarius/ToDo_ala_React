import { createContext, useContext, ReactNode } from 'react';
import TodoStore from '@/types/TodoStore';

export const TodoStoreContext = createContext<TodoStore | null>(null);

export interface TodoStoreProviderProps {
  children: ReactNode;
  store: TodoStore;
}

export function TodoStoreProvider({ children, store }: TodoStoreProviderProps) {
  return (
    <TodoStoreContext.Provider value={store}>
      {children}
    </TodoStoreContext.Provider>
  );
}

export function useTodoStore(): TodoStore {
  const context = useContext(TodoStoreContext);
  if (!context) {
    throw new Error('useTodoStore must be used within a TodoStoreProvider');
  }
  return context;
}
