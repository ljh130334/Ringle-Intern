import React, { useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setCurrentDate } from '../../../store/slices/calendarSlice';
import { setShowDatePicker } from '../../../store/slices/uiSlice';
import { dateToString } from '../../../utils/dateUtils';
import 'react-day-picker/dist/style.css';
import './CalendarSidebar.scss';

const CalendarSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentDate } = useAppSelector((state) => state.calendar);
  const { showDatePicker } = useAppSelector((state) => state.ui);

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

      if (showDatePicker) {
        dispatch(setShowDatePicker(false));
      }
    }
  };

  return (
    <div className="w-full bg-[#F8FAFD] h-full overflow-y-auto">
      <div className="px-4 pt-3 pb-4">
        <button
          className="flex items-center gap-3 pl-4 pr-3 py-4 bg-white rounded-[16px] shadow-lg hover:shadow-xl 
                   border border-gray-200 hover:bg-[#EDF1FC] transition-shadow duration-200 text-[#1f1f1f] w-auto text-left"
        >
          <img src="/icons/plus.svg" alt="추가" className="w-6 h-6" />
          <span className="text-sm font-medium">만들기</span>
          <img src="/icons/arrow-down.svg" alt="검색" className="w-5 h-5" />
        </button>
      </div>

      <div
        className={`pl-[19px] pr-[27px] mb-6 pt-[6px] ${showDatePicker ? 'ring-2 ring-blue-500 rounded-lg bg-blue-50' : ''}`}
      >
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
            className={`custom-day-picker ${showDatePicker ? 'highlight-picker' : ''}`}
            showOutsideDays
            fixedWeeks
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarSidebar;
