import React from 'react';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

const CalendarHeader: React.FC = () => {
  return (
    <header className="bg-[#F8FAFD] border-b border-gray-200 p-2">
      <div className="flex items-center justify-between w-full">
        <div className="flex-shrink-0">
          <HeaderLeft />
        </div>
        <div className="flex-shrink-1 min-w-0">
          <HeaderRight />
        </div>
      </div>
    </header>
  );
};

export default CalendarHeader;
