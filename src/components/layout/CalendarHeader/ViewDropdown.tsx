import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setView } from '../../../store/slices/calendarSlice';
import type { CalendarView } from '../../../types';

const ViewDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const { view } = useAppSelector((state) => state.calendar);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleViewChange = (newView: CalendarView) => {
    dispatch(setView(newView));
    setIsOpen(false);
  };

  const getViewLabel = (viewType: CalendarView) => {
    switch (viewType) {
      case 'day':
        return '일';
      case 'week':
        return '주';
      case 'month':
        return '월';
      default:
        return '주';
    }
  };

  const viewOptions = [
    { key: 'day', label: '일', shortkey: 'D', disabled: true },
    {
      key: 'week' as CalendarView,
      label: '주',
      shortkey: 'W',
      disabled: false,
    },
    {
      key: 'month' as CalendarView,
      label: '월',
      shortkey: 'M',
      disabled: false,
    },
    { key: 'year', label: '연도', shortkey: 'Y', disabled: true },
    { key: 'schedule', label: '일정', shortkey: 'A', disabled: true },
    { key: '4days', label: '4일', shortkey: 'X', disabled: true },
  ];

  return (
    <div className="relative flex-shrink-0" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ml-3 flex items-center px-[19px] py-[9px] border border-[#747775] rounded-[100px] hover:bg-[#E7E8EB] cursor-pointer transition-colors duration-200 whitespace-nowrap"
      >
        <span className="text-sm font-medium text-gray-700">
          {getViewLabel(view)}
        </span>
        <img
          src="/icons/arrow-down.svg"
          alt="드롭다운"
          className={`w-4 h-4 ml-2 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 left-3 bg-[#F0F4F8] rounded-[4px] shadow-md py-2 z-50 min-w-[155px]">
          {viewOptions.map((option) => (
            <button
              key={option.key}
              onClick={() =>
                !option.disabled &&
                (option.key === 'week' || option.key === 'month') &&
                handleViewChange(option.key as CalendarView)
              }
              disabled={option.disabled}
              className={`w-full text-left px-4 py-2 text-[14px] transition-colors duration-200 whitespace-nowrap ${
                view === option.key
                  ? 'bg-[#E7E8EB] text-gray-700 font-medium'
                  : option.disabled
                    ? 'cursor-not-allowed text-gray-400'
                    : 'text-gray-700 hover:bg-[#E7E8EB]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option.label}</span>
                <span className="text-[10px] flex-shrink-0 ml-2">
                  {option.shortkey}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewDropdown;
