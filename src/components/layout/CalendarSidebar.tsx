import React, { useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCurrentDate } from '../../store/slices/calendarSlice';
import { dateToString } from '../../utils/dateUtils';
import 'react-day-picker/dist/style.css';
import './CalendarSidebar.scss';

const CalendarSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentDate } = useAppSelector((state) => state.calendar);

  const today = new Date();
  const selectedDate = new Date(currentDate);

  useEffect(() => {
    const todayString = dateToString(today);
    if (currentDate !== todayString) {
      console.log('Setting current date to today:', todayString);
      dispatch(setCurrentDate(todayString));
    }
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd');
      dispatch(setCurrentDate(dateString));
    }
  };

  return (
    <div className="w-full bg-[#F8FAFD] h-full overflow-y-auto">
      <div className="px-4 pt-3 pb-4">
        <button className="flex items-center gap-3 pl-4 pr-3 py-4 bg-white rounded-[20px] shadow-md hover:shadow-lg hover:bg-[#EDF1FC] transition-shadow duration-200 text-[#1f1f1f] w-auto text-left">
          <img src="/icons/plus.svg" alt="검색" className="w-6 h-6" />
          <span className="text-sm font-medium">만들기</span>
          <img src="/icons/arrow-down.svg" alt="검색" className="w-5 h-5" />
        </button>
      </div>

      <div className="pl-[19px] pr-[27px] mb-6 pt-[6px]">
        <div>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            today={today}
            locale={ko}
            formatters={{
              formatCaption: (date) =>
                format(date, 'yyyy년 M월', { locale: ko }),
            }}
            className="custom-day-picker"
            showOutsideDays
            fixedWeeks
          />
        </div>
      </div>

      <div className="px-4 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="text-sm">사용자 검색</span>
        </div>
      </div>

      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">내 캘린더</h3>
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded px-1 py-1">
            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            <span className="text-sm text-gray-700">이지현</span>
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded px-1 py-1">
            <div className="w-3 h-3 border-2 border-blue-500 bg-white rounded-sm"></div>
            <span className="text-sm text-gray-700">Tasks</span>
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded px-1 py-1">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <span className="text-sm text-gray-700">생일</span>
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">다른 캘린더</h3>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <svg
              className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded px-1 py-1">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <span className="text-sm text-gray-700">대한민국의 휴일</span>
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded px-1 py-1">
            <div className="w-3 h-3 border-2 border-blue-500 bg-white rounded-sm"></div>
            <span className="text-sm text-gray-700">rjh1026@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSidebar;
