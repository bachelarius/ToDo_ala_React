'use client';

import { ReactNode, useEffect, useState } from 'react';
import { TodoStoreProvider } from '@/contexts/TodoStoreContext';
import LocalStorageTodoStore from '@/stores/LocalStorageTodoStore';
import TodoStore from '@/types/TodoStore';

interface TodoStoreWrapperProps {
  children: ReactNode;
}

export default function TodoStoreRoot({ children }: TodoStoreWrapperProps) {
  const [store, setStore] = useState<TodoStore | null>(null);

  useEffect(() => {
    setStore(new LocalStorageTodoStore());
  }, []);

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <TodoStoreProvider store={store}>
      {children}
    </TodoStoreProvider>
  );
}
