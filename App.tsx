import React, { useState, useEffect, useCallback } from 'react';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoItem } from './components/TodoItem';
import { Todo } from './types';
import { FilterTabs } from './components/FilterTabs';

enum FilterStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodoText, setNewTodoText] = useState<string>('');
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.ALL);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = useCallback(() => {
    if (newTodoText.trim() === '') {
      return;
    }
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: newTodoText.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTodos(prevTodos => [newTodo, ...prevTodos]);
    setNewTodoText('');
  }, [newTodoText]);

  const handleToggleComplete = useCallback((id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const handleRemoveTodo = useCallback((id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  const handleClearCompleted = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filter === FilterStatus.ACTIVE) return !todo.completed;
    if (filter === FilterStatus.COMPLETED) return todo.completed;
    return true;
  }).sort((a, b) => b.createdAt - a.createdAt);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-indigo-950 text-slate-200 flex flex-col items-center pt-12 sm:pt-20 px-4">
      <div className="w-full max-w-2xl">
        <header className="mb-10 text-center">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse-slow">
            TASKGLOW
          </h1>
          <p className="mt-3 text-indigo-300 text-lg">Illuminate your productivity path.</p>
        </header>

        <AddTodoForm
          value={newTodoText}
          onChange={setNewTodoText}
          onAdd={handleAddTodo}
        />

        {todos.length > 0 && (
          <FilterTabs currentFilter={filter} onFilterChange={setFilter} />
        )}

        <main className="mt-6 bg-slate-900/50 backdrop-blur-md shadow-2xl shadow-purple-500/10 rounded-xl overflow-hidden border border-purple-500/20">
          {filteredTodos.length === 0 && todos.length > 0 && (
             <p className="p-8 text-center text-indigo-400 text-lg">
              {filter === FilterStatus.ACTIVE ? "All tasks aligned. System optimal." : "No completed objectives in this sector."}
            </p>
          )}
          {todos.length === 0 && (
            <p className="p-8 text-center text-indigo-400 text-lg">System idle. Input new task directive.</p>
          )}
          <ul className="divide-y divide-purple-500/20">
            {filteredTodos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={handleToggleComplete}
                onRemoveTodo={handleRemoveTodo}
                // No isFirst/isLast specific styling needed with new design
              />
            ))}
          </ul>
        </main>
        
        {todos.length > 0 && (
          <footer className="mt-8 flex justify-between items-center text-sm text-indigo-400 px-2">
            <span>{activeTodosCount} task{activeTodosCount !== 1 ? 's' : ''} pending</span>
            <button 
              onClick={handleClearCompleted}
              className="hover:text-cyan-400 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-indigo-400"
              disabled={todos.every(todo => !todo.completed)}
            >
              Purge Completed
            </button>
          </footer>
        )}
      </div>
       <footer className="mt-20 mb-10 text-center text-indigo-500 text-xs">
        <p>&copy; {new Date().getFullYear()} TaskGlow OS. Quantum Entanglement Systems.</p>
      </footer>
    </div>
  );
};

export default App;