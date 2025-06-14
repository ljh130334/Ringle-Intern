import React from 'react';
import { formatDate, isTodayDate } from '../../../utils/dateUtils';

interface WeekHeaderProps {
  weekDays: Date[];
  onDayClick: (date: Date) => void;
}

const WeekHeader: React.FC<WeekHeaderProps> = ({ weekDays, onDayClick }) => {
  const weekdayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="flex bg-white sticky top-0 z-10 pr-[15px]">
      <div className="w-20 flex-shrink-0 p-3 pb-1 flex items-end justify-center">
        <div className="text-[11px] text-[#444746]">GMT+09</div>
      </div>

      {/* 요일별 헤더 */}
      {weekDays.map((date, index) => {
        const dateString = formatDate(date);
        const isTodayCheck = isTodayDate(date);

        return (
          <div
            key={dateString}
            className="flex-1 p-3 pt-2 text-center cursor-pointer group"
            onClick={() => onDayClick(date)}
          >
            {/* 요일 이름 */}
            <div
              className={`text-[11px] mb-1 font-medium ${
                isTodayCheck ? 'text-[#0b57d0]' : 'text-[#444746]'
              }`}
            >
              {weekdayNames[index]}
            </div>

            {/* 날짜 숫자 */}
            <div className="flex justify-center">
              <div
                className={`w-[46px] h-[46px] flex items-center justify-center text-2xl font-normal ${
                  isTodayCheck
                    ? 'bg-[#0b57d0] text-white rounded-full'
                    : 'text-[#3c4043] group-hover:bg-[#e5e7eb] group-hover:rounded-full transition-all duration-200'
                }`}
              >
                {date.getDate()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeekHeader;
