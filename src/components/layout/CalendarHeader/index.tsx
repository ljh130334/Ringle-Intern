import React from 'react';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import ViewSelector from './ViewSelector';

const CalendarHeader: React.FC = () => {
  return (
    <header className="bg-[#F8FAFD] border-b border-gray-200 p-2">
      <div className="flex items-center justify-between w-full">
        <HeaderLeft />
        <HeaderRight />
      </div>

      {/* 모바일에서는 두 번째 행에 뷰 선택기 표시 */}
      <div className="md:hidden mt-3 flex justify-center">
        <ViewSelector />
      </div>
    </header>
  );
};

export default CalendarHeader;
