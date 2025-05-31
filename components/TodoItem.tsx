import React from 'react';
import { Todo } from '../types';
import { TrashIcon } from './icons/TrashIcon';
import { CheckIcon } from './icons/CheckIcon';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onRemoveTodo: (id: string) => void;
  // isFirst and isLast props are no longer needed for individual item rounding
  // as the parent <ul> and <main> now handle overall rounding.
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onRemoveTodo }) => {
  const itemClasses = `
    flex items-center justify-between p-4 group transition-colors duration-150 ease-in-out
    ${todo.completed ? 'bg-slate-800/30' : 'hover:bg-purple-800/30'}
  `;

  return (
    <li className={itemClasses} role="listitem">
      <div className="flex items-center flex-grow min-w-0">
        <button
          onClick={() => onToggleComplete(todo.id)}
          aria-label={todo.completed ? "Mark as active" : "Mark as complete"}
          aria-pressed={todo.completed}
          className={`
            w-6 h-6 rounded-full border-2 transition-all duration-150 ease-in-out mr-4 flex-shrink-0
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900/50 
            ${todo.completed 
              ? 'bg-cyan-500 border-cyan-500 focus:ring-cyan-400 shadow-[0_0_10px_theme(colors.cyan.500/70)]' 
              : 'border-indigo-600 hover:border-cyan-400 focus:ring-cyan-500'}
          `}
        >
          {todo.completed && <CheckIcon className="w-4 h-4 text-slate-900 mx-auto" />}
        </button>
        <span 
          className={`
            flex-grow truncate cursor-pointer transition-colors
            ${todo.completed ? 'line-through text-indigo-400/80' : 'text-slate-100 hover:text-cyan-300'}
          `}
          onClick={() => onToggleComplete(todo.id)}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onRemoveTodo(todo.id)}
        aria-label="Delete task"
        className="ml-4 p-1.5 text-indigo-500 hover:text-red-400 transition-colors duration-150 ease-in-out opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-red-400 rounded-md"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </li>
  );
};