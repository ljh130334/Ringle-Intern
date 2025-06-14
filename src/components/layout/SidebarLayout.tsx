import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleSidebar } from '../../store/slices/uiSlice';
import CalendarSidebar from './CalendarSidebar/CalendarSidebar';

const SidebarLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mobileView, sidebarOpen } = useAppSelector((state) => state.ui);

  return (
    <div
      className={`
        ${
          mobileView
            ? `fixed inset-0 z-50 transition-all duration-300 ease-out ${
                sidebarOpen
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              }`
            : 'relative'
        }
      `}
    >
      {/* 모바일 백드롭 */}
      {mobileView && (
        <div
          className={`
            absolute inset-0 bg-black transition-all duration-300 ease-out
            ${sidebarOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'}
          `}
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      {/* 사이드바 컨테이너 */}
      <div
        className={`
          h-full bg-white
          ${
            mobileView
              ? `fixed left-0 top-0 z-10 w-80 transform transition-all duration-400 ease-out ${
                  sidebarOpen
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-full opacity-90'
                }`
              : `relative transition-all duration-400 ease-out ${
                  sidebarOpen
                    ? 'w-64 opacity-100 translate-x-0'
                    : 'w-0 opacity-0 -translate-x-8 overflow-hidden'
                }`
          }
        `}
      >
        <div
          className={`
            h-full transition-all duration-300 ease-out
            ${!sidebarOpen && !mobileView ? 'invisible scale-95' : 'visible scale-100'}
          `}
        >
          <CalendarSidebar />
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
