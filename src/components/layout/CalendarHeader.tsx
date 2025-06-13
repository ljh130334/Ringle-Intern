import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  goToPrevious,
  goToNext,
  goToToday,
  setView,
} from '../../store/slices/calendarSlice';
import { toggleSidebar, setHeaderView } from '../../store/slices/uiSlice';
import { formatYearMonth } from '../../utils/dateUtils';
import type { CalendarView } from '../../types';

// 헤더 좌측 - 햄버거 메뉴, 로고, 네비게이션
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
    <div className="flex items-center">
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
          <span className="text-[22px] font-normal pl-1 font-[500]">
            Calendar
          </span>
        </div>
      </div>

      <div className="flex items-center ml-2">
        <button
          onClick={handleTodayClick}
          className="px-6 py-[9px] text-sm font-medium border border-[#747775] rounded-[100px] hover:bg-[#E7E8EB] transition-colors duration-200 mr-5"
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

        <h1 className="text-[22px] font-normal text-gray-700 mx-2 px-2">
          {formatYearMonth(new Date(currentDate))}
        </h1>
      </div>
    </div>
  );
};

// 헤더 우측 - 검색, 도움말, 설정, 프로필 등
const HeaderRight: React.FC = () => {
  const dispatch = useAppDispatch();
  const { headerView } = useAppSelector((state) => state.ui);

  return (
    <div className="flex items-center px-[6px]">
      <button
        className="p-2 hover:bg-[#EAECEF] rounded-full transition-colors duration-200"
        aria-label="검색"
      >
        <img src="/icons/search.svg" alt="검색" className="w-6 h-6" />
      </button>

      <button
        className="my-[1px] p-2 hover:bg-[#EAECEF] rounded-full transition-colors duration-200"
        aria-label="도움말"
      >
        <img src="/icons/help.svg" alt="도움말" className="w-6 h-6" />
      </button>

      <button
        className="ml-1 p-2 hover:bg-[#EAECEF] rounded-full transition-colors duration-200"
        aria-label="설정"
      >
        <img src="/icons/settings.svg" alt="설정" className="w-6 h-6" />
      </button>

      <div className="ml-3 flex items-center px-[19px] py-[9px] border border-[#747775] rounded-[100px] hover:bg-[#E7E8EB] cursor-pointer transition-colors duration-200">
        <span className="text-sm font-medium text-gray-700">주</span>
        <img
          src="/icons/arrow-down.svg"
          alt="드롭다운"
          className="w-4 h-4 ml-2"
        />
      </div>

      <div className="inline-flex ml-3">
        <button
          onClick={() => dispatch(setHeaderView('calendar'))}
          className={`py-[9px] flex items-center justify-center border border-r-0 border-[#747775] rounded-l-full transition-colors duration-200 ${
            headerView === 'calendar' ? 'bg-[#c2e7ff]' : 'hover:bg-[#EAECEF]'
          }`}
          aria-label="캘린더 보기"
        >
          <img
            src="/icons/calendar-add.svg"
            alt="캘린더 추가"
            className="w-5 h-5 ml-[18px] mr-[14px]"
          />
        </button>

        <button
          onClick={() => dispatch(setHeaderView('tasks'))}
          className={`py-[9px] flex items-center justify-center border border-[#747775] rounded-r-full transition-colors duration-200 ${
            headerView === 'tasks' ? 'bg-[#c2e7ff]' : 'hover:bg-[#EAECEF]'
          }`}
          aria-label="작업"
        >
          <img
            src="/icons/tasks.svg"
            alt="작업"
            className="w-5 h-5 mr-[18px] ml-[14px]"
          />
        </button>
      </div>

      <button
        className="ml-2 p-2 hover:bg-[#EAECEF] rounded-full transition-colors duration-200"
        aria-label="Google 앱"
      >
        <img src="/icons/apps.svg" alt="Google 앱" className="w-6 h-6" />
      </button>

      <button
        className="ml-2 w-10 h-10 rounded-full overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all duration-200"
        aria-label="계정"
      >
        <img
          src="/icons/profile.svg"
          alt="프로필"
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );
};

// 뷰 선택 컴포넌트
const ViewSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const { view } = useAppSelector((state) => state.calendar);

  const handleViewChange = (newView: CalendarView) => {
    dispatch(setView(newView));
  };

  const views = [
    { key: 'day' as const, label: '일' },
    { key: 'week' as const, label: '주' },
    { key: 'month' as const, label: '월' },
  ];

  return (
    <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1">
      {views.map((viewOption) => (
        <button
          key={viewOption.key}
          onClick={() => handleViewChange(viewOption.key)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            view === viewOption.key
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          {viewOption.label}
        </button>
      ))}
    </div>
  );
};

// 메인 헤더 컴포넌트
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
