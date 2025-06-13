import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  goToPrevious,
  goToNext,
  goToToday,
} from '../../../store/slices/calendarSlice';
import { toggleSidebar } from '../../../store/slices/uiSlice';
import { formatYearMonth } from '../../../utils/dateUtils';

const HeaderLeft: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentDate } = useAppSelector((state) => state.calendar);

  const handlePreviousClick = () => {
    dispatch(goToPrevious());
  };

  const handleNextClick = () => {
    dispatch(goToNext());
  };

  const handleTodayClick = () => {
    dispatch(goToToday());
  };

  const handleMenuClick = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="flex items-center flex-shrink-0">
      <div className="flex items-center min-w-[238px] pr-[25px]">
        <button
          onClick={handleMenuClick}
          className="p-3 mx-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          aria-label="메뉴"
        >
          <img src="/icons/menu.svg" alt="메뉴" className="w-6 h-6" />
        </button>

        <div className="flex items-center">
          <img
            src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_13_2x.png"
            alt="캘린더 로고"
            className="w-10 h-10 mr-1"
            aria-hidden="true"
            role="presentation"
          />
          <span className="text-[22px] font-normal pl-1 font-[500] whitespace-nowrap">
            Calendar
          </span>
        </div>
      </div>

      <div className="flex items-center ml-2">
        <button
          onClick={handleTodayClick}
          className="px-6 py-[9px] text-sm font-medium border border-[#747775] rounded-[100px] hover:bg-[#E7E8EB] transition-colors duration-200 mr-5 whitespace-nowrap"
        >
          오늘
        </button>

        <div className="flex items-center mr-1">
          <button
            onClick={handlePreviousClick}
            className="p-1 hover:bg-[#EAECEF] rounded-full transition-colors duration-200"
            aria-label="이전"
          >
            <img src="/icons/arrow-left.svg" alt="이전" className="w-6 h-6" />
          </button>
          <button
            onClick={handleNextClick}
            className="p-1 hover:bg-[#EAECEF] rounded-full transition-colors duration-200"
            aria-label="다음"
          >
            <img src="/icons/arrow-right.svg" alt="다음" className="w-6 h-6" />
          </button>
        </div>

        <h1 className="text-[22px] font-normal text-gray-700 mx-2 px-2 whitespace-nowrap">
          {formatYearMonth(new Date(currentDate))}
        </h1>
      </div>
    </div>
  );
};

export default HeaderLeft;
