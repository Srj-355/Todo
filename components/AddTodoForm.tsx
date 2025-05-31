import React from 'react';
import { PlusIcon } from './icons/PlusIcon';

interface AddTodoFormProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ value, onChange, onAdd }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-8 p-1.5 bg-slate-900/70 backdrop-blur-sm rounded-xl shadow-lg border border-cyan-500/20">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Initiate new todo..."
        className="flex-grow bg-transparent text-slate-100 placeholder-indigo-400/70 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 rounded-lg transition-all"
        aria-label="New todo text"
      />
      <button
        type="submit"
        className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold py-3 px-5 rounded-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-900/80 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-cyan-500 shadow-[0_0_10px_0_theme(colors.cyan.600/50)] hover:shadow-[0_0_15px_0_theme(colors.cyan.500/70)]"
        disabled={value.trim() === ''}
        aria-label="Add new task"
      >
        <PlusIcon className="w-5 h-5" />
        Engage
      </button>
    </form>
  );
};
