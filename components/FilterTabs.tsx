import React from 'react';

enum FilterStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

interface FilterTabsProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

const filters = [
  { label: 'All Directives', value: FilterStatus.ALL },
  { label: 'Active Systems', value: FilterStatus.ACTIVE },
  { label: 'Objectives Met', value: FilterStatus.COMPLETED },
];

export const FilterTabs: React.FC<FilterTabsProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="flex justify-center space-x-2 sm:space-x-3 p-1.5 bg-slate-900/60 backdrop-blur-sm rounded-xl shadow-md border border-purple-500/20 mb-8" role="tablist">
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          role="tab"
          aria-selected={currentFilter === filter.value}
          className={`
            px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base font-medium rounded-lg transition-all duration-150 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900/70 
            ${currentFilter === filter.value 
              ? 'bg-purple-600 text-white shadow-[0_0_10px_theme(colors.purple.600/70)]' 
              : 'text-indigo-300 hover:bg-indigo-700/50 hover:text-cyan-300'}
          `}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};