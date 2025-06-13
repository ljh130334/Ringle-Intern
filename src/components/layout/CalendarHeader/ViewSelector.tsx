import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setView } from '../../../store/slices/calendarSlice';
import type { CalendarView } from '../../../types';

const ViewSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const { view } = useAppSelector((state) => state.calendar);

  const handleViewChange = (newView: CalendarView) => {
    dispatch(setView(newView));
  };

  const views = [
    { key: 'day' as const, label: '일', disabled: true },
    { key: 'week' as const, label: '주', disabled: false },
    { key: 'month' as const, label: '월', disabled: false },
  ];

  return (
    <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1">
      {views.map((viewOption) => (
        <button
          key={viewOption.key}
          onClick={() =>
            !viewOption.disabled && handleViewChange(viewOption.key)
          }
          disabled={viewOption.disabled}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            view === viewOption.key
              ? 'bg-white text-blue-600 shadow-sm'
              : viewOption.disabled
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          {viewOption.label}
        </button>
      ))}
    </div>
  );
};

export default ViewSelector;
