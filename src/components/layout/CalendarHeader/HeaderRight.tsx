import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setHeaderView } from '../../../store/slices/uiSlice';
import ViewDropdown from './ViewDropdown';

const HeaderRight: React.FC = () => {
  const dispatch = useAppDispatch();
  const { headerView } = useAppSelector((state) => state.ui);

  return (
    <div className="flex items-center px-[6px] flex-shrink-0 overflow-hidden">
      <button
        className="p-2 hover:bg-[#EAECEF] rounded-full transition-colors duration-200 flex-shrink-0"
        aria-label="검색"
      >
        <img src="/icons/search.svg" alt="검색" className="w-6 h-6" />
      </button>

      <button
        className="my-[1px] p-2 hover:bg-[#EAECEF] rounded-full transition-colors duration-200 flex-shrink-0"
        aria-label="도움말"
      >
        <img src="/icons/help.svg" alt="도움말" className="w-6 h-6" />
      </button>

      <button
        className="ml-1 p-2 hover:bg-[#EAECEF] rounded-full transition-colors duration-200 flex-shrink-0"
        aria-label="설정"
      >
        <img src="/icons/settings.svg" alt="설정" className="w-6 h-6" />
      </button>

      <div className="flex-shrink-0">
        <ViewDropdown />
      </div>

      <div className="inline-flex ml-3 flex-shrink-0">
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
        className="ml-2 p-2 hover:bg-[#EAECEF] rounded-full transition-colors duration-200 flex-shrink-0"
        aria-label="Google 앱"
      >
        <img src="/icons/apps.svg" alt="Google 앱" className="w-6 h-6" />
      </button>

      <button
        className="ml-2 w-10 h-10 rounded-full overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all duration-200 flex-shrink-0"
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

export default HeaderRight;
